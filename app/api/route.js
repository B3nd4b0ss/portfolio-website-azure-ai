import { OpenAIClient } from '@azure/openai';
import { AzureKeyCredential } from '@azure/core-auth';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
dotenv.config();

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const model = process.env.AZURE_OPENAI_MODEL;

const DATA_RESUME = 'my name is Ben Grob';

export async function POST(req) {
    try {
        const { messages } = await req.json();
        const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

        messages.unshift({
            role: 'system',
            content: `You are PortfolioGPT, answering only questions based on the resume provided.
            Resume:
            ${DATA_RESUME}
            Help users learn more about Ben Grob from his resume.`
        });

        const response = await client.getChatCompletions({
            deploymentId: model,
            messages: messages,
            maxTokens: 128,
        });

        return NextResponse.json({
            message: response.choices[0].message.content
        });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({
            error: 'Failed to process the request.',
            details: error.message
        }, { status: 500 });
    }
}
