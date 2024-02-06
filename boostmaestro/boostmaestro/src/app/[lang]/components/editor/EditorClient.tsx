"use client"

import React, { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { useSession } from 'next-auth/react'
import { generateHTML } from '@tiptap/html'
import { ReloadIcon } from "@radix-ui/react-icons"
import { Link as TiptapLink } from "@tiptap/extension-link"
import EditorComponent from "@/app/[lang]/components/editor/EditorComponent"
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { Button } from "@/app/[lang]/components/ui/button"
import { Locale } from "@../../../i18n.config"
import { twMerge } from "tailwind-merge"

export interface EditorWrapperProps {
    documentId: string
    link?: string
    buttonText?: string
    initialLocale: Locale
    className?: string
}

const fetchParagraph = async (documentId: string, locale: Locale) => {
    const response = await fetch('/api/content', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Document-ID': documentId,
            'Locale': locale,
        }),
        next: {
            tags: [`fetch-paragraph-${documentId}`]
        }
    })

    return response.json()
}

const EditorWrapper: React.FC<EditorWrapperProps> = ({ documentId, link, buttonText, initialLocale, className }) => {
    const { status, data: session } = useSession()
    const [fetchedContent, setFetchedContent] = useState('')

    const [currentLocale, setCurrentLocale] = useState(initialLocale)

    const handleLocaleChange = useCallback(async (newLocale: Locale) => {
        const response = await fetchParagraph(documentId, newLocale)

        if (response) {
            const contentAsHtml = generateHTML(response.paragraphJson, [
                StarterKit,
                TextStyle,
                Color,
                TiptapLink,
            ])
            setFetchedContent(contentAsHtml)
        } else {
            console.error('Error fetching content:', response.error)
        }
    }, [documentId])

    useEffect(() => {
        handleLocaleChange(currentLocale)
    }, [currentLocale, handleLocaleChange])

    // if (status === "loading") {
    //     return (
    //         <motion.div className="flex justify-center items-center mt-5 w-full h-full">
    //             <ReloadIcon className="w-4 h-4 animate-spin" />
    //         </motion.div>
    //     )
    // }

    return (
        <div className={twMerge("w-full", className)}>
            <EditorComponent
                currentLocale={currentLocale}
                documentId={documentId}
                editable={!!session}
                initialContent={fetchedContent}
                onLocaleChange={setCurrentLocale}
            />
            {link && buttonText && (
                <div className="px-4 flex justify-center">
                    <Button variant='secondary' className="rounded-lg mt-4" size='lg'>
                        <Link href={link}>
                            <p>{buttonText}</p>
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default EditorWrapper
