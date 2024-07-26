import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { AzureOpenAI } from "openai";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const deployment = process.env.AZURE_OPENAI_MODEL;
const apiVersion = "2024-05-01-preview";

if (!endpoint || !deployment) {
    throw new Error("Environment variables AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_MODEL must be set");
}

const DATA_RESUME = "my name is Ben Grob";

export async function POST(req) {
    try {
        const { messages } = await req.json();
        const credential = new DefaultAzureCredential();
        const scope = "https://cognitiveservices.azure.com/.default";
        const azureADTokenProvider = getBearerTokenProvider(credential, scope);

        const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });

        messages.unshift({
            role: "system",
            content: `You are PortfolioGPT, answering only questions based on the resume provided.
            Resume:
            ${DATA_RESUME}
            Help users learn more about Ben Grob from his resume.`
        });

        const response = await client.chat.completions.create({
            messages: messages,
            max_tokens: 128,
            stream: false,
        });

        return NextResponse.json({
            message: response.choices[0].message.content
        });
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({
            error: "Failed to process the request.",
            details: error.message
        }, { status: 500 });
    }
}
