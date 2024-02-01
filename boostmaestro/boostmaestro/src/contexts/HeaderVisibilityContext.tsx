"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context data
type HeaderVisibilityContextType = {
    isHeaderVisible: boolean;
    setIsHeaderVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create context with default value
const HeaderVisibilityContext = createContext<HeaderVisibilityContextType>({
    isHeaderVisible: true, // Default visibility
    setIsHeaderVisible: () => {}, // Default empty function
});

export const useHeaderVisibility = () => useContext(HeaderVisibilityContext);

type HeaderVisibilityProviderProps = {
    children: ReactNode;
};

export const HeaderVisibilityProvider: React.FC<HeaderVisibilityProviderProps> = ({ children }) => {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    return (
        <HeaderVisibilityContext.Provider value={{ isHeaderVisible, setIsHeaderVisible }}>
            {children}
        </HeaderVisibilityContext.Provider>
    );
};
