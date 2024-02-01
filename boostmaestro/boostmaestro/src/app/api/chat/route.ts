import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
    // const session = await getServerSession(authOptions)
    // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const json = await req.json()
    const { messages } = json

    const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        stream: true
    })

    const stream = OpenAIStream(res)
    return new StreamingTextResponse(stream)
}