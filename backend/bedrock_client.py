import boto3
import json
import os
from dotenv import load_dotenv

load_dotenv()

REGION = os.getenv("AWS_REGION")
MODEL_ID = os.getenv("MODEL_ID")

client = boto3.client(
    service_name="bedrock-runtime",
    region_name=REGION
)

def ask_bedrock(prompt):

    body = {
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }

    response = client.invoke_model(
        modelId=MODEL_ID,
        body=json.dumps(body)
    )

    response_body = json.loads(
        response["body"].read()
    )

    return response_body