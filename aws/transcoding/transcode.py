import subprocess
import concurrent.futures
import uuid
import boto3
from dotenv import load_dotenv
import os

load_dotenv()

def download_s3_file(bucket_name, object_key, download_path, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION):
    try:
        # create an s3 client
        s3_client = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY, region_name=AWS_REGION)

        # check if the download path exists, if not create it for downloading the file
        if not os.path.exists(download_path):
            os.makedirs(download_path)

        # get the absolute path of the file to be downloaded
        absolute_path = os.path.abspath(f'{download_path}/{object_key}')

        # download the file from s3
        s3_client.download_file(bucket_name, object_key, absolute_path)
        return absolute_path
    except Exception as e:
        print(f"Error downloading {object_key} from bucket {bucket_name}: {e}")
        raise

# Function to get the resolution of the input video
def get_video_resolution(input_file):
    # command to be executed to get the resolution of the video
    cmd = ['./bash_scripts/probe.sh', input_file]

    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)

        width, height = map(int, result.stdout.strip().split('x'))

        return width, height
    except subprocess.CalledProcessError as e:

        print(f"Error occurred: {e.stderr}")
        raise

# Function to transcode video to a specific resolution
def transcode_video(input_file, resolution, output_path, index):
    try:
        # based on width and height specified, run transcoding script and save the output to the output path
        width, height = resolution
        cmd = ['./bash_scripts/transcode.sh', input_file, str(width), str(height), str(output_path), str(index)]
        subprocess.run(cmd)
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        raise

def create_master_index(valid_resolutions, output_path):

    # bandwidths for different resolutions -
    # this is to be used in the master index file for switching between different resolutions based on internet speed
    bandwidths = {
        '1080p':'5000000',
        '720p':'2800000',
        '480p':'1400000',
        '360p':'800000',
        '240p':'300000'
    }

    try:

        # path for the master index file
        master_index_destination = f'{output_path}/master.m3u8'

        # write the master index file - if not created, create it and then write
        with open(master_index_destination, 'w+') as file:

            # write the header for the master index file
            file.write('#EXTM3U\n#EXT-X-VERSION:3\n\n')

            # write the resolutions and bandwidths to the master index file
            for _, (label, resolution) in enumerate(valid_resolutions.items()):
                bandwidth = bandwidths[label]
                file.write(f'#EXT-X-STREAM-INF:BANDWIDTH={bandwidth},RESOLUTION={resolution[0]}x{resolution[1]}\n')
                file.write(f'{min(resolution[1], resolution[0])}p/index.m3u8\n')

            file.close()


    except Exception as e:
        print(e)
        raise

def save_to_s3(output_path,AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_PROCESSED_STORAGE_BUCKET):

    try:
        # create an s3 client
        s3_client = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY, region_name=AWS_REGION)

        # get the bucket name from the environment variables
        bucket_name = S3_PROCESSED_STORAGE_BUCKET

        '''
            Recursively walk through the output path and upload the files to the s3 bucket one by one, until all files are uploaded
        '''
        for root, dirs, files in os.walk(output_path):
            for file in files:
                print("FILE IS ", file)
                print("Saving to ", os.path.join(root, file))
                s3_client.upload_file(os.path.join(root, file), bucket_name, os.path.join(root, file))

    except Exception as e:
        print(e)
        raise


# Main function to handle video transcoding
def main(input_file):
    try:
        resolutions = {
            '1080p': (1920, 1080),
            '720p': (1280, 720),
            '480p': (854, 480),
            '360p': (640, 360),
            '240p': (320, 240)
        }

        width, height = get_video_resolution(input_file)
        max_dimension = max(width, height)

        # Determine the maximum resolution for transcoding
        max_resolution = max([res for res in resolutions.values() if res[0] <= width and res[1] <= height])
        valid_resolutions = {key: value for key, value in resolutions.items() if value <= max_resolution}

        # If the height is the maximum dimension, find the maximum resolution based on the height, and filter resolutions
        if max_dimension == height:
            max_resolution = max([res for res in resolutions.values() if res[1] <= width and res[0] <= height])

            # flip the horizontal and vertical dimensions from horizontal resolutions object
            # like if you have get (720, 1280) then after finding max from horizontal resolutions object you will get (1280, 720), so flip it
            valid_resolutions = {key: (h,w) for key, (w,h) in resolutions.items() if (w,h) <= max_resolution}


        # get the filename from the input_file - ignoring the directories
        filename = input_file.split('/')[-1]

        # randomUUID for not having to deal with same filename conflicts
        randomId = uuid.uuid1()

        # construct output path
        output_path = f'outputs/{filename}_{randomId}'

        # if this path does not exist, create it
        if not os.path.exists(output_path):
            os.makedirs(output_path)

        # Transcode the video to the valid resolutions
        with concurrent.futures.ProcessPoolExecutor() as executor:
            futures = []
            for index, (label, resolution) in enumerate(valid_resolutions.items()):
                futures.append(executor.submit(transcode_video, input_file, resolution, f'{output_path}/{label}', index))

            for future in concurrent.futures.as_completed(futures):
                future.result()

        # Create the master index file
        create_master_index(valid_resolutions, output_path)

        return output_path

    except Exception as e:
        raise

if __name__ == '__main__':

    try:

        # get data
        bucket_name = os.getenv('S3_BUCKET_NAME')
        object_key = os.getenv('S3_OBJECT_KEY')
        download_path = 'videos'
        AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
        AWS_REGION= os.getenv('AWS_REGION')
        S3_PROCESSED_STORAGE_BUCKET=os.getenv('S3_PROCESSED_STORAGE_BUCKET')

        # download the file from s3
        downloaded_path = download_s3_file(bucket_name, object_key, download_path, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION)

        # run the transcoding and other miscellaneous tasks related to it
        output_path = main(downloaded_path)

        save_to_s3(output_path,AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_PROCESSED_STORAGE_BUCKET)

    except Exception as e:
        print(e)


