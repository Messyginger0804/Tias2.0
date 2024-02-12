"use client";

import { initialCheckoutFormData } from "@/utils";
import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

const protectedRoutes = ["cart", "checkout", "account", "orders", "adminView"];

const protectedAdminRoutes = [
    "/adminView",
    "/adminView/addProduct",
    "/adminView/allProducts",
];

export default function GlobalState({ children }) {
    const [showNavModal, setShowNavModal] = useState(false);
    const [pageLoader, setPageLoader] = useState(true);
    const [componentLoader, setComponentLoader] = useState({
        loading: false,
        id: "",
    });
    const [isAuthUser, setIsAuthUser] = useState(null);
    const [user, setUser] = useState(null);
    const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [addressFormData, setAddressFormData] = useState({
        fullName: "",
        city: "",
        state: "",
        postalCode: "",
        address: "",
    });

    const [checkoutFormData, setCheckoutFormData] = useState(
        initialCheckoutFormData
    );

    const [allOrdersForUser, setAllOrdersForUser] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState([]);

    const router = useRouter();
    const pathName = usePathname();
    const params = useSearchParams();


    useEffect(() => {
        if (Cookies.get("token") !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem("user")) || {};
            const getCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            setUser(userData);
            setCartItems(getCartItems);
        } else {
            setIsAuthUser(false);
            setUser({}); //unauthenticated user
        }
    }, [Cookies]);

    useEffect(() => {
        if (
            pathName !== "/register" &&
            !pathName.includes("product") &&
            pathName !== "/" &&
            user &&
            Object.keys(user).length === 0 &&
            protectedRoutes.includes(pathName) > -1
        )
            router.push("/login");
    }, [user, pathName]);

    useEffect(() => {
        if (
            user !== null &&
            user &&
            Object.keys(user).length > 0 &&
            user?.role !== "admin" &&
            protectedAdminRoutes.indexOf(pathName) > -1
        )
            router.push("/unauthorizedPage");
    }, [user, pathName]);
    return (
        <GlobalContext.Provider
            value={{
                params,
                pathName,
                router,
                showNavModal,
                setShowNavModal,
                pageLoader,
                setPageLoader,
                isAuthUser,
                setIsAuthUser,
                user,
                setUser,
                componentLoader,
                setComponentLoader,
                currentUpdatedProduct,
                setCurrentUpdatedProduct,
                showCartModal,
                setShowCartModal,
                cartItems,
                setCartItems,
                addresses,
                setAddresses,
                addressFormData,
                setAddressFormData,
                checkoutFormData,
                setCheckoutFormData,
                allOrdersForUser,
                setAllOrdersForUser,
                orderDetails,
                setOrderDetails,
                allOrdersForAllUsers,
                setAllOrdersForAllUsers,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}