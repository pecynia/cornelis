
import { getDocument, getParagraphJson } from '@/lib/utils/db'

import React from 'react'
import { Locale } from '@../../../i18n.config'

async function EditorWrapper({ initialLocale, documentId }: { initialLocale: Locale, documentId: string}) {

    const result = await getParagraphJson(documentId, initialLocale)
    console.log(result?.paragraphJson.content)

    return (
        <div>{JSON.stringify(result?.paragraphJson.content)}</div>
    )
}

export default EditorWrapper