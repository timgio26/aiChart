import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { ArrayToString } from "./Tools";

const client = ModelClient(
  "https://models.github.ai/inference",
  new AzureKeyCredential(import.meta.env.VITE_AI_KEY)
);

export async function getRespFromAi() {
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "user", content: "give me one short quotes to cheer me up" },
      ],
      model: "openai/gpt-4.1-nano",
    },
  });
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  return response.body.choices[0].message.content;
}

export async function getRecipeFromAi(items: string[]) {
  const myItemsString = ArrayToString(items);
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        {
          role: "system",
          content:
            "You are a helpful chef assistant that always responds in strict JSON format. Do not include any explanation or extra text.",
        },
        {
          role: "user",
          content: `give me recipe using : ${myItemsString}, format your respond like this
        {
        "title": string,
        "difficulty": number,
        "instructions": string[]
        }
        `,
        },
      ],
      model: "openai/gpt-4.1-nano",
    },
  });
  if (isUnexpected(response)) {
    throw new Error(response.body.error.message);
  }
  if (!response.body.choices[0].message.content) {
    throw new Error("ai content error");
  }
  return JSON.parse(response.body.choices[0].message.content);
}

export async function getChartDesc(imageurl: string) {
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        {
          role: "system",
          content:
            "You are a helpful data analyst that always responds in strict JSON format. Do not include any explanation or extra text.",
        },

        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: imageurl } },
            {
              type: "text",
              text: `
            give me explanation about this chart ${imageurl}, format your respond like this
              {
                chartType:string,
                insight:string
              }
            `,
            },
          ],
          //   content: `give me explanation about this chart ${imageurl}, format your respond like this
          // {
          //   chartType:string,
          //   insight:string
          // }
          // `
        },
      ],
      model: "openai/gpt-4.1-nano",
    },
  });
  console.log(response);
  if (isUnexpected(response)) {
    throw new Error(response.body.error.message);
  }
  return response.body.choices[0].message.content;
}

// "https://imgupload-urf0.onrender.com/uploads/3a1e670e90a04260832bfcb881fb65a1.png"
