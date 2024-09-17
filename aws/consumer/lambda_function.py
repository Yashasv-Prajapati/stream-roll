import boto3
import json
import os
import requests
from dotenv import load_dotenv

load_dotenv()

AWS_REGION = os.getenv('REGION')

# Initialize boto3 clients
ecs_client = boto3.client('ecs', region_name=AWS_REGION)

# Configuration
CLUSTER_NAME = os.getenv('CLUSTER_NAME')
TASK_DEFINITION = os.getenv('TASK_DEFINITION')
SUBNETS = os.getenv('SUBNETS').split(',')
SECURITY_GROUPS = os.getenv('SECURITY_GROUPS').split(',')
S3_PROCESSED_STORAGE_BUCKET = os.getenv('S3_PROCESSED_STORAGE_BUCKET')

def lambda_handler(event, context):
    for record in event['Records']:
        try:
            process_message(record)
        except Exception as e:
            print(f"Failed to process message: {e}")

def process_message(message):
    body = json.loads(message['body'])
    s3_info = body['Records'][0]['s3']
    bucket_name = s3_info['bucket']['name']
    object_key = s3_info['object']['key']

    print(f"PROCESS VALUE - {bucket_name} {object_key}")

    data = {
        'bucket_name': bucket_name,
        'object_key': object_key
    }
    # load balancer
    load_balancer_url = 'http://<project-load-balancer>.<region>.elb.amazonaws.com/process'
    headers = {'Content-Type': 'application/json'}
    response = requests.post(load_balancer_url, data=json.dumps(data), headers=headers)

    print(f"Started ECS task for object {object_key} in bucket {bucket_name}")

    return {
        'statusCode': 200,
        'body': json.dumps('Task started'),
        'fastapi_response':response
    }


'''
The following code block is to test the lambda function
'''
if __name__ == '__main__':
    # Test locally
    test_event = {
        "Records": [
            {
                "body": json.dumps({
                    "Records": [
                        {
                            "s3": {
                                "bucket": {"name": "unprocessedvideos"},
                                "object": {"key": "output3.mp4"}
                            }
                        }
                    ]
                })
            }
        ]
    }
    lambda_handler(test_event, None)
