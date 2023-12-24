'use client'

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);


export default function GlobalState({ children }) {
    const [showNavModal, setShowNavModal] = useState(false);
    const [isAuthUser, setIsAuthUser] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log(Cookies.get('token'))

        const userLoggedIn = Cookies.get('token')

        if (userLoggedIn !== undefined) {
            setIsAuthUser(isAuthUser)
            const userData = JSON.parse(localStorage.getItem('user')) || {}
            setUser(userData)
        } else {
            setIsAuthUser(false)
        }

    }, [Cookies])

    return (
        <GlobalContext.Provider value={{
            showNavModal, setShowNavModal,
            isAuthUser, setIsAuthUser,
            user, setUser,
        }}>
            {children}
        </GlobalContext.Provider>
    )
} 