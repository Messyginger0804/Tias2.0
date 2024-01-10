'use client'

import ProductButton from "./ProductButton";
import ProductCard from "./ProductCard";

const fakeData = [
    {

        _id: '659d938902a508d9f3e109c8',
        name: "mens tshirt blue",
        description: "slim fit blue mens t-shirt",
        price: 19,
        category: "men",
        sizes: [
            {

                id: "s",
                label: "S"
            }
        ],
        deliveryInfo: "same day",
        onSale: "yes",
        priceDrop: 24,
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/tias-thenewone.appspot.com/o/ecommerce%2Fmens-shirt-blue.jpg%20-%201704825600763-%20e0f5pczn66?alt=media&token=5977c51e-7b86-42dd-9327-ba887b34cbbf",
    },

    // https://firebasestorage.googleapis.com/v0/b/tias-thenewone.appspot.com/o/ecommerce%2Fmens-shirt-blue.jpg%20-%201704825600763-%20e0f5pczn66?alt=media&token=5977c51e-7b86-42dd-9327-ba887b34cbbf
];

// let data = fakeData

export default function ProductListing(
    { data }
) {

    return <section
        className="bg-whtie py-12 sm:py-16"
    >
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mt-10 grid grid-cols gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
                {
                    data && data.length ?
                        data.map(item =>
                            <article
                                className="realitive flex flex-col overflow-hiden border cursor-pointer"
                                key={item._id}
                            >
                                <ProductCard item={item} />
                                <ProductButton />
                            </article>
                        )
                        : null
                }
            </div>
        </div>
    </section>
}