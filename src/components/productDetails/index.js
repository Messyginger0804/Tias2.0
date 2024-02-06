'use client'

import { useContext, useEffect } from "react";
import ComponentLoader from "../loader";
import Notification from "../notification";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { toast } from "react-toastify";



export default function ProductDetails({ item }) {

    const {
        setComponentLoader,
        componentLoader,
        user, router,
        setShowCartModal,
    } = useContext(GlobalContext);

    async function handleAddToCart(getItem) {
        setComponentLoader({ loading: true, id: "" });

        const res = await addToCart({ productID: getItem._id, userID: user._id });

        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLoader({ loading: false, id: "" });
            setShowCartModal(true);
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLoader({ loading: false, id: "" });
            setShowCartModal(true);
        }
    }


    useEffect(() => {
        router.refresh();
    }, []);



    // console.log('*********************', item);
    return (
        <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-black">
            <div className="container mx-auto px-4">
                <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                    <div className="lg:col-span-3 lg:row-end-1">
                        <div className="lg:flex lg:items-start">
                            <div className="lg:order-2 lg:ml-5">
                                <div className="max-w-xl overflow-hidden rounded-lg">
                                    <img
                                        src={item.imageUrl}
                                        className="h-full w-full max-w-full object-cover"
                                        alt="Product Details"
                                    />
                                </div>
                            </div>
                            <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                <div className="flex flex-row items-start lg:flex-col">
                                    <button
                                        type="button"
                                        className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                                    >
                                        <img
                                            src={item.imageUrl}
                                            className="h-full w-full object-cover"
                                            alt="Product Details"
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                                    >
                                        <img
                                            src={item.imageUrl}
                                            className="h-full w-full object-cover"
                                            alt="Product Details"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {item && item.name}
                        </h1>
                        <div className="mt-10 flex flex-col items-center justify-between space-y-4 botder-t border-b py-4 sm:flex-row sm:space-y-0">
                            <div className="flex items-end">
                                <h1
                                    className={`text-3xl font-bold mr-2 ${item.onSale === "yes" ? "line-through" : ""
                                        }`}
                                >
                                    ${item && item.price}
                                </h1>
                                {item.onSale === "yes" ? (
                                    <p className="mr-3 text-2xl font-semibold text-red-700">{`$ ${(
                                        item.price -
                                        item.price * (item.priceDrop / 100)
                                    ).toFixed(2)}`}</p>
                                ) : null}
                                {item.onSale === "yes" ? (
                                    <p className="mr-3 text-sm font-semibold">{`-(${item.priceDrop}%)off`}</p>
                                ) : null}
                            </div>
                            <button
                                type="button"
                                onClick={() => handleAddToCart(item)}
                                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white"
                            >
                                {componentLoader && componentLoader.loading ? (
                                    <ComponentLoader
                                        text={"Adding to Cart"}
                                        color={"#ffffff"}
                                        loading={
                                            componentLoader && componentLoader.loading
                                        }
                                    />
                                ) : (
                                    "Add to Cart"
                                )}

                                {/* add to cart */}
                            </button>
                        </div>
                        <ul className="mt-8 space-y-2">
                            <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                {item && item.deliveryInfo}
                            </li>
                            <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                {"Cancel anytime"}
                            </li>
                        </ul>
                        <div className="lg:col-span-3">
                            <div className="border-b border-gray-400">
                                <nav className="flex gap-4">
                                    <a
                                        href="#"
                                        className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900"
                                    >
                                        Description
                                    </a>
                                </nav>
                            </div>
                            <div className="mt-8 flow-root sm:mt-12">
                                {item && item.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </section>
    )
}