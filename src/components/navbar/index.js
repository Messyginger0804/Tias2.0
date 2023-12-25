'use client'

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext } from "react";
import CommonModal from "../CommonModal";
import { GiHamburgerMenu } from "react-icons/gi";
import Cookies from "js-cookie";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";


const isAdmin = true;
// const isAdmin = false;
// const isAuthuser = true;
// const isAuthUser = false;

// const user = {
//     role: 'admin',
// }

function NavItems({ isModalView = false, isAdmin, router }) {

    const { showNavModal, setShowNavModal } = useContext(GlobalContext)
    const { user, isAuthUser } = useContext(GlobalContext)

    return (
        <div
            className={`items-center justify-between w-full md:flex md:w-auto ${isModalView ? "" : "hidden"
                }`}
            id="nav-items"
        >

            <ul
                className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${isModalView ? "border-none" : "border border-gray-100"
                    }`}
            >
                {isAdmin
                    ? adminNavOptions.map((item) => (
                        <li
                            className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                            key={item.id}
                            onClick={() => router.push(item.path)}
                        >
                            {item.label}
                        </li>
                    ))
                    : navOptions.map((item) => (
                        <li
                            className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                            key={item.id}
                            onClick={() => router.push(item.path)}
                        >
                            {item.label}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

function Navbar() {
    const { showNavModal, setShowNavModal } = useContext(GlobalContext);
    const router = useRouter()
    const {
        user,
        isAuthUser,
        setIsAuthUser,
        setUser,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal
    } = useContext(GlobalContext);

    // console.log(user, isAuthUser, 'navabar------');

    const handleLogOut = () => {
        setIsAuthUser(false);
        setUser(null);
        Cookies.remove('token');
        localStorage.clear()
        router.push('/')
    }


    return <>
        <nav className="bg-white fixed w-full z-20 top-0 left-0 border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center cursor-pointer">
                    <span className="self-center text-2xl font-semibold">
                        Tias Shop
                    </span>
                </div>
                <div className="flex md:order-2 gap-2">

                    {
                        !isAdmin && isAuthUser ?
                            (
                                <Fragment>
                                    {/* <button className=" mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded">Account</button> */}
                                    <button className='btn1'>Account</button>
                                    <button className=" btn1">Cart</button>
                                </Fragment>
                            ) : null
                    }

                    {
                        user?.role === 'admin' ?
                            isAdmin ? <button className="btn1">Customer View</button> : <button className="btn1">Admin View</button>
                            : null
                    }
                    {
                        user ? <button className="btn1"
                            onClick={handleLogOut}
                        >Logout</button> : <button className="btn1"
                            onClick={router.push('/login')}
                        >Login</button>
                    }
                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                        onClick={() => setShowNavModal(true)}
                    >
                        <span className="sr-only">Open main menu</span>


                        <span>
                            <GiHamburgerMenu className="text-black" />
                        </span>

                    </button>
                </div>
                <NavItems isModal={false} />
            </div>

        </nav >
        <CommonModal
            show={showNavModal}
            setShow={setShowNavModal}
            mainContent={<NavItems isModalView={true} />}
        />
    </>
}

export default Navbar;