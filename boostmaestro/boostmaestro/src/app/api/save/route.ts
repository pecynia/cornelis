import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { saveParagraphJson } from "@/lib/utils/db"
import { Locale } from "@/app/../../../i18n.config"

// Save the paragraph JSON to the database
export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const paragraphJson = await request.json()

    // Retrieve the document ID from headers
    const documentId = request.headers.get('Document-ID')
    const locale = request.headers.get('Locale') as Locale

    if (!documentId) {
        return new Response(JSON.stringify({ error: "Document-ID header is required" }), {
            headers: { "Content-Type": "application/json" },
            status: 400
        })
    }

    if (!locale) {
        return new Response(JSON.stringify({ error: "Locale header is required" }), {
            headers: { "Content-Type": "application/json" },
            status: 400
        })
    }

    const result = await saveParagraphJson(documentId, locale, paragraphJson)

    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
    })
}
