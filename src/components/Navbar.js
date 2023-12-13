'use client'

import { Fragment } from "react";


const isAdmin = true;
const isCustomer = false;

const user = {
    role: 'admin',
}

function NavItems() {
    return (
        <div className="items-center justify-between w-full md:flex md:w-auto" id="nav-items">
            <ul className="fles flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white">

            </ul>
        </div>
    )
}

function Navbar() {
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
                        !isAdmin && isCustomer ?
                            (
                                <Fragment>
                                    <button>Account</button>
                                    <button>Cart</button>
                                </Fragment>
                            ) : null
                    }

                    {
                        user?.role === 'admin' ?
                            isAdmin ? <button>Customer View</button> : <button>Admin View</button>
                            : null
                    }
                    {
                        user ? <button>Logout</button> : <button>Login</button>
                    }
                </div>

            </div>

        </nav>
    </>
}

export default Navbar;