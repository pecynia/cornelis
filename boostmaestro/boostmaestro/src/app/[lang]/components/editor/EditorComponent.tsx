"use client"

import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { toast } from 'sonner'
import { RotateCw, Save } from 'lucide-react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import CustomBulletList from '@/app/[lang]/components/editor/CustomBulletList'
import { generateJSON } from '@tiptap/html'
import MenuBar from '@/app/[lang]/components/editor/MenuBar'
import { Button } from '@/app/[lang]/components/ui/button'
import { motion } from 'framer-motion'
import EditorLocaleSwitcher from '@/app/[lang]/components/editor/EditorLocaleSwitcher'
import { Locale } from '../../../../../i18n.config'

interface EditorComponentProps {
    initialContent?: string
    editable?: boolean
    documentId: string
    currentLocale: Locale
    onLocaleChange: (newLocale: Locale) => void
}

const EditorComponent: React.FC<EditorComponentProps> = ({
    initialContent = '',
    editable = false,
    documentId,
    currentLocale,
    onLocaleChange
}) => {
    const [editorContent, setEditorContent] = useState({})
    const [isSaving, setIsSaving] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Start typing...',
            }),
            TextStyle,
            Color,
            CustomBulletList,
            Link.configure({
                openOnClick: true,
                autolink: true,
                HTMLAttributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    class: 'hyperlink',
                },
            }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose max-w-none w-full',
            },
        },
        editable: editable,
        onUpdate: ({ editor }) => {
            const contentJson = generateJSON(editor.getHTML(), [StarterKit, TextStyle, Color, Link])
            setEditorContent(contentJson)
            setHasChanges(true)
        },
    })

    useEffect(() => {
        if (initialContent) {
            editor?.commands.setContent(initialContent)
        }
        console.log("Writing lang:", currentLocale)
    }, [initialContent, editor, currentLocale])

    const handleLocaleChange = (newLocale: Locale) => {
        onLocaleChange(newLocale) // Call the passed in onLocaleChange function
    }

    // Make a post fetch request to secure API endpoint
    const handleSave = async () => {
        setIsSaving(true)
        try {
            const res = await fetch('/api/save', {
                method: 'POST',
                body: JSON.stringify(editorContent),
                headers: {
                    'Content-Type': 'application/json',
                    'Document-ID': documentId,
                    'Locale': currentLocale
                },
            })
            if (res.ok) {
                toast.success('Saved successfully!')
            } else {
                toast.error('Oops, something went wrong. Please try again later.')
            }
            setHasChanges(false)
        } catch (error) {
            console.error('Failed to save:', error)
        } finally {
            setIsSaving(false)
        }
    }


    return (
        <motion.div
            layout
            transition={{ type: "spring", ease: "easeInOut", duration: 0.1 }}
            className='relative flex flex-col'
        >
            {editable && (
                <>
                    <MenuBar editor={editor} />
                </>
            )}
            <motion.div layout>
                <EditorContent editor={editor} />
            </motion.div>

            {editable && (
                <div className='relative'>
                    {/* Locale switcher, bottom left below the text area  */}
                    <div className="absolute flex justify-start bottom-0 right-0 left-[50%] -mb-14 -ml-1/2" style={{ transform: 'translateX(-100%)' }} >
                        <EditorLocaleSwitcher currentLocale={currentLocale} onLocaleChange={handleLocaleChange} />
                    </div>
                    {/* Save button, bottom right below the text area  */}
                    <div className="absolute flex justify-end bottom-0 right-0 -mb-14">
                        {hasChanges && (
                            isSaving ?
                                <Button disabled size="lg">
                                    <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                    Saving
                                </Button> :
                                <Button size="lg" onClick={handleSave}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save
                                </Button>
                        )}
                    </div>
                </div>
            )}
        </motion.div>
    )
}

export default EditorComponent
