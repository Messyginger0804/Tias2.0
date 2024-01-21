'use client'

// import { fakeData } from "@/utils"
import { GlobalContext } from "@/context"
import { useContext } from "react"


function ProductCard(
    { item }
) {

    const { router } = useContext(GlobalContext)

    return (
        <div onClick={() => router.push(`/product/${item._id}`)} className="text-black">
            <div className="overflow-hideen aspect-w-1 aspect-h-1 h-52">
                <img
                    src={item.imageUrl}
                    alt="Product image"
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                />
            </div>
            {item.onSale === "yes" ? (
                <div className="bg-black w-fit rounded">
                    <p className="rounded-full p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                        Sale
                    </p>
                </div>
            ) : (
                <p className="rounded-full p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                    not Sale
                </p>
            )}
            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                    <p
                        className={`mr-3 text-sm font-semibold ${item.onSale === "yes" ? "line-through" : ""
                            }`}
                    >{`$ ${item.price}`}</p>
                    {item.onSale === "yes" ? (
                        <p className="mr-3 text-sm font-semibold text-red-700">{`$ ${(
                            item.price -
                            item.price * (item.priceDrop / 100)
                        ).toFixed(2)}`}</p>
                    ) : null}
                    {item.onSale === "yes" ? (
                        <p className="mr-3 text-sm font-semibold">{`-(${item.priceDrop}%)off`}</p>
                    ) : null}
                </div>
                <h3 className="md-2 text-gray-400 text-sm">{item.name}</h3>
            </div>
        </div>
    )
}

export default ProductCard