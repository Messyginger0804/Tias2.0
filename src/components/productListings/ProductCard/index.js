'use client'

// import { fakeData } from "@/utils"


function ProductCard(
    { item }
) {
    return (
        <div
            // onClick={() => router.push(`/product/${item._id}`)}
            className="text-black">
            <div className="overflow-hideen aspect-w-1 aspect-h-1 h-52 ">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover transition-all duration-300 hover:scale-110"
                />
            </div>
            <h3>{item.onsale}</h3>
            {item.onSale === "yes" ? (
                <div className="absolute top-0 m-2 rounded-full bg-black">
                    <p className="rounded-full  p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                        Sale
                    </p>
                </div>
            ) : null}
            {/* {console.log(item.onSale)} */}
            {/* {console.log(item.deliveryInfo)} */}

            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex items-center">
                    <p className="mr-3 text-sm font-semibold">
                        {`$${item.price}`}
                    </p>
                    {item.onSale === 'yes' && (<p className="text-red-900 font-bold">on sale</p>)}
                </div>
                <h3 className="md-3 text-gray-400 text-sm">{item.name}</h3>
            </div>
        </div>
    )
}

export default ProductCard