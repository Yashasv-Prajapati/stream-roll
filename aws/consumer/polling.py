'''
This is for a different architecture, incase you don't want to use lambda function and instead use a VM like EC2 instance to continuosly poll the SQS queue for messages and then on a new message, start an ECS task.
'''
import boto3
import json
import time
import os
from dotenv import load_dotenv

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_REGION = os.getenv('AWS_REGION')

# Initialize boto3 clients
sqs_client = boto3.client('sqs', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY, region_name=AWS_REGION)
ecs_client = boto3.client('ecs', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY, region_name=AWS_REGION)

# Configuration
CLUSTER_NAME = os.getenv('CLUSTER_NAME')
TASK_DEFINITION = os.getenv('TASK_DEFINITION')
SUBNETS = os.getenv('SUBNETS').split(',')
SECURITY_GROUPS = os.getenv('SECURITY_GROUPS').split(',')
QUEUE_URL = os.getenv('QUEUE_URL')
S3_PROCESSED_STORAGE_BUCKET = os.getenv('S3_PROCESSED_STORAGE_BUCKET')

def poll_sqs_queue():
    while True:
        response = sqs_client.receive_message(
            QueueUrl=QUEUE_URL,
            MaxNumberOfMessages=5,
            WaitTimeSeconds=10
        )

        messages = response.get('Messages', [])
        if not messages:
            print("No messages in queue, sleeping for a while...")
            time.sleep(30)
            continue

        for message in messages:
            try:
                process_message(message)
                sqs_client.delete_message(
                    QueueUrl=QUEUE_URL,
                    ReceiptHandle=message['ReceiptHandle']
                )
            except Exception as e:
                print(f"Failed to process message: {e}")

def process_message(message):
    body = json.loads(message['Body'])
    s3_info = body['Records'][0]['s3']
    bucket_name = s3_info['bucket']['name']
    object_key = s3_info['object']['key']

    # Trigger ECS Fargate task
    response = ecs_client.run_task(
        cluster=CLUSTER_NAME,
        taskDefinition=TASK_DEFINITION,
        launchType='FARGATE',
        count=1,
        networkConfiguration={
            'awsvpcConfiguration': {
                'subnets': SUBNETS,
                'securityGroups': SECURITY_GROUPS,
                'assignPublicIp': 'ENABLED'
            }
        },
        overrides={
            'containerOverrides': [
                {
                    'name': 'video-container-1',
                    'environment': [
                        {'name': 'S3_BUCKET_NAME', 'value': bucket_name},
                        {'name': 'S3_OBJECT_KEY', 'value': object_key},
                        {'name':'S3_PROCESSED_STORAGE_BUCKET', 'value': S3_PROCESSED_STORAGE_BUCKET},
                        {'name': 'AWS_REGION', 'value': AWS_REGION}
                    ]
                }
            ]
        }
    )

    print(f"Started ECS task for object {object_key} in bucket {bucket_name}")

if __name__ == '__main__':
    poll_sqs_queue()
