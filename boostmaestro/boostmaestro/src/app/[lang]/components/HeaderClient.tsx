"use client"

import React, { useState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

export const HeaderClient = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    const [position, setPosition] = useState(typeof window !== 'undefined' ? window.scrollY : 0)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            let moving = window.scrollY
            setVisible(position > moving || moving < 10)
            setPosition(moving)
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [position])

    return (
        <header 
            className={twMerge(className, `${visible ? 'translate-y-0' : '-translate-y-full'}`)}
        >
            {children}
        </header>
    )
}