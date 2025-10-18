import os,json
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
from dotenv import load_dotenv
from pydantic import BaseModel


load_dotenv(override=True)  # Loads from .env by default

class AiRespSchema(BaseModel):
    insight:str
    

endpoint = "https://models.github.ai/inference"
token = os.getenv("GITHUB_TOKEN")
print(token)

client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
)

def getAiResp(model:str,imgurl:str):
    response = client.complete(
        messages=[{"role": "system","content":"You are a helpful data analyst that always responds in strict JSON format. Do not include any explanation or extra text."},
                  {"role":"user","content":[{
                      "type":"image_url",
                      "image_url":{"url":imgurl}
                  },{
                      "type":"text",
                      "text":"give me explanation about this chart retun in {insight:str}"
                  }]}
        ],
        model=model
    )
    
    respJson = json.loads(response.choices[0].message.content)
    respParsed = AiRespSchema(**respJson)

    return respParsed

