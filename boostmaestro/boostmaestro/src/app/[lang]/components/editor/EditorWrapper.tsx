"use client"

import React, { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useSession } from 'next-auth/react'
import { generateHTML } from '@tiptap/html'
import { ReloadIcon } from "@radix-ui/react-icons"
import { Link as TiptapLink } from "@tiptap/extension-link"
import EditorComponent from "@/app/[lang]/components/editor/EditorComponent"
import { getParagraph } from "@/app/_actions"
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { Button } from "@/app/[lang]/components/ui/button"
import { Locale } from "@../../../i18n.config"
import { twMerge } from "tailwind-merge"

interface EditorWrapperProps {
    documentId: string
    initialLocale: Locale
    className?: string
    link?: string
    buttonText?: string
}

const EditorWrapper: React.FC<EditorWrapperProps> = ({ documentId, link, buttonText, initialLocale, className }) => {
    const { status, data: session } = useSession()
    const [fetchedContent, setFetchedContent] = useState('')

    // State for managing the current locale of the editor
    const [currentLocale, setCurrentLocale] = useState<Locale>(initialLocale)

    // Function for handling locale changes
    const handleLocaleChange = useCallback(async (newLocale: Locale) => {
        setCurrentLocale(newLocale) // Update the current locale
        const response = await getParagraph(documentId, newLocale)

        if (response && response.success) {
            const contentAsHtml = generateHTML(response.data?.paragraphJson, [
                StarterKit,
                TextStyle,
                Color,
                TiptapLink,
            ])
            setFetchedContent(contentAsHtml)
        } else {
            console.error('Error fetching content:', response?.error)
        }
    }, [documentId])

    useEffect(() => {
        handleLocaleChange(currentLocale)
    }, [currentLocale, handleLocaleChange])

    if (status === "loading") {
        return (
            <motion.div layout className="flex justify-center items-center mt-5 w-full h-full">
                <ReloadIcon className="w-4 h-4 animate-spin" />
            </motion.div>
        )
    }

    return (
        <motion.div layout className={twMerge("w-full", className)}>
            <EditorComponent
                currentLocale={currentLocale}
                documentId={documentId}
                editable={!!session}
                initialContent={fetchedContent}
                onLocaleChange={handleLocaleChange}
            />
            {link && buttonText && (
                <div className="px-4 flex justify-center">
                    <Button variant='secondary' className="rounded-lg mt-4" size='lg'>
                        <Link href={link} className="text-lg">
                            <p>{buttonText}</p>
                        </Link>
                    </Button>
                </div>
            )}
        </motion.div>
    )
}

export default EditorWrapper
