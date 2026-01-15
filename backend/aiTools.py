import os,json
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
from dotenv import load_dotenv
from pydantic import BaseModel


load_dotenv(override=True)  # Loads from .env by default

class AiRespSchema(BaseModel):
    answer:str
    

endpoint = "https://models.github.ai/inference"
token = os.getenv("GITHUB_TOKEN")
# print(token)

client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
)

def getAiResp(model:str,imgurl:str,prompt:str):
    prompt_num = int(prompt)
    prompts=["""
            Analyze the image carefully. The image contains a chart, a question about the chart, and multiple‑choice options.

            Follow these steps in your reasoning:
            1. Describe the chart’s structure and what variables it shows.
            2. Identify the data points relevant to the question.
            3. Compare the values logically.
            4. Eliminate incorrect options with justification.
            5. Provide the final answer as one letter (A, B, C, or D) with this format {answer:str}.

            Show your reasoning clearly before giving the final answer.
            ""","""
            Look at the image and answer the question based on the chart. Choose the correct option (A, B, C, or D) with this format {answer:str}.
            """]
    response = client.complete(
        messages=[{"role": "system","content":"You are a helpful data analyst that always responds in strict JSON format. Do not include any explanation or extra text."},
                  {"role":"user","content":[{
                      "type":"image_url",
                      "image_url":{"url":imgurl}
                  },{
                      "type":"text",
                      "text":prompts[prompt_num]
                  }]}
        ],
        model=model
    )
    
    respJson = json.loads(response.choices[0].message.content)
    respParsed = AiRespSchema(**respJson)

    return respParsed

