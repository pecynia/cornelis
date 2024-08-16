"use client"

export const HeaderClient = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {

    return (
        <header>
            {children}
        </header>
    )
}