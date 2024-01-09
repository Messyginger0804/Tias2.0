'use client'

import Image from "next/image"

// {
//     _id: '659d938902a508d9f3e109c8',
//     name: "mens tshirt blue",
//     description: "slim fit blue mens t-shirt",
//     price: 19,
//     category: "men",
//     sizes: [
//         {

//             id: "s",
//             label: "S"
//         }
//     ],
//     deliveryInfo: "same day",
//     onSale: "yes",
//     priceDrop: 24,
//     imageUrl: "https://firebasestorage.googleapis.com/v0/b/tias-thenewone.appspot.com/o/ecommerce%2Fmens-shirt-blue.jpg%20-%201704825600763-%20e0f5pczn66?alt=media&token=5977c51e-7b86-42dd-9327-ba887b34cbbf",
// },


function ProductCard({ item }) {
    return (
        <div className="text-black">
            <div className="over-hidden aspect-w-1 aspect-h-1 h-52">
                {/* <Image
                    src={item.imageUrl}
                    alt={item.name}
                    className='h-full w-full object-cover transition-all duration-300 group-hover:scale-125'
                    width='300'
                    height='300'
                /> */}
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className='h-full w-full object-cover transition-all duration-300 group-hover:scale-125'
                />
            </div>
            {item.onSale == "yes" ? (
                <div className="absolute top-0 m-2 rounded-full bg-black">
                    <p className="rounded-full p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                        Sale
                    </p>
                </div>
            ) : null}
            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                    <p className="mr-3 text-sm font-semibold">
                        {`$${item.price}`}
                    </p>
                </div>
                <h3 className="md-3 text-gray-400 text-sm">{item.name}</h3>
            </div>
        </div>
    )
}

export default ProductCard