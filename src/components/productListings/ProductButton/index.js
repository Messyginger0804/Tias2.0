'use client'

import { usePathname } from "next/navigation"


function ProductButton() {
    const pathName = usePathname

    const isAdminView = pathName.includes('adminView')

    return isAdminView ? (
        <>
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-whtie">
                update
            </button>
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-whtie">
                delte
            </button>
        </>
    ) : (
        <>
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-whtie">
                add to cart
            </button>
        </>
    )
}

export default ProductButton