'use client'

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);


export default function GlobalState({ children }) {
    const [showNavModal, setShowNavModal] = useState(false);
    const [pageLoader, setPageLoader] = useState({
        loading: false,
        id: "",
    })
    const [commponentLoader, setComponentLoader] = useState(false)
    const [isAuthUser, setIsAuthUser] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // console.log(Cookies.get('token'))

        const userLoggedIn = Cookies.get('token')

        if (userLoggedIn !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem("user")) || {};
            setUser(userData);

        } else {
            setIsAuthUser(false);
            setUser({}); //unauthenticated user
        }
    }, [Cookies])

    return (
        <GlobalContext.Provider value={{
            showNavModal, setShowNavModal,
            isAuthUser, setIsAuthUser,
            user, setUser,
            pageLoader, setPageLoader,
            commponentLoader, setComponentLoader,
        }}>
            {children}
        </GlobalContext.Provider>
    )
} 