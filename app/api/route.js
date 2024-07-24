import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
dotenv.config();

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const model = process.env.AZURE_OPENAI_MODEL;

export async function POST(req) {
    const {messages} = await req.json();
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

    messages.unshift({
        role: 'system',
        content:`You are PortfolioGPT, answering only questions based on the resume provided.
Resume:
${DATA_RESUME}

Help users learn more about Ben Grob from his resume.
`


    })

    const response = await client.getChatCompletions({
        deploymentId: model,
        messages: messages,
        maxTokens: 128,
    });

    return NextResponse.json({
        message: response.choices[0].message.content
    });
}

const DATA_RESUME = '';
