'use client'

import { GlobalContext } from "@/context";
import { useContext } from "react";


function ProductButton({ item }) {
    const { currentUpdatedProduct, setCurrentUpdatedProduct,
        router,
        pathName } = useContext(GlobalContext)

    const isAdminView = pathName.includes('adminView');

    return isAdminView ? (
        <>
            <button
                onClick={() => {
                    setCurrentUpdatedProduct(item);
                    router.push('/adminView/addProduct')
                }}
                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-whtie hover:bg-slate-800">
                update
            </button>
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-whtie hover:bg-slate-800">
                delete
            </button>
        </>
    ) : (
        <>
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-whtie hover:bg-slate-800">
                add to cart
            </button>
        </>
    )
}

export default ProductButton