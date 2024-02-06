import { NextRequest } from 'next/server'
import { getParagraphJson } from '@/lib/utils/db'
import { Locale } from '@../../../i18n.config'

export async function GET(request: NextRequest) {
    const documentId = request.headers.get('Document-ID') as string
    const locale = request.headers.get('Locale') as Locale

    // Perform your data fetching logic here
    const paragraph = await getParagraphJson(documentId, locale)

    return new Response(JSON.stringify(paragraph), {
        headers: { 'Content-Type': 'application/json' },
    })
}
