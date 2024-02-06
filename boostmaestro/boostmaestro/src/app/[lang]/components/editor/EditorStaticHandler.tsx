"use client"

import { useSession } from "next-auth/react"
import EditorComponent from "@/app/[lang]/components/editor/EditorComponent"
import { Locale } from "@../../../i18n.config"
import { useState } from "react"

function EditorStaticHandler({ documentId, initialLocale }: { documentId: string, initialLocale: Locale }) {

    const { status, data: session } = useSession()
    const [currentLocale, setCurrentLocale] = useState(initialLocale)

    if (status === 'loading') return <div>Prefetched here</div>
    if (!session) return <div>Prefetched here (not logged in)</div>


    return (
        <div>
            <EditorComponent
                currentLocale={currentLocale}
                documentId={documentId}
                editable={!!session}
                onLocaleChange={setCurrentLocale}
            />
        </div>
    )
}

export default EditorStaticHandler