'use client'

import ProductButton from "./ProductButton";
import ProductCard from "./ProductCard";


// _id
// 659d938902a508d9f3e109c8
// name
// "mens tshirt blue"
// description
// "slim fit blue mens t-shirt"
// price
// 19
// category
// "men"

// sizes
// Array (5)
// deliveryInfo
// "same day"
// onSale
// "yes"
// priceDrop
// 24
// imageUrl
// "https://firebasestorage.googleapis.com/v0/b/tias-thenewone.appspot.com…"
// createdAt
// 2024-01-09T18:42:17.731+00:00
// updatedAt
// 2024-01-09T18:42:17.731+00:00
// __v
// 0

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
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/tias-thenewone.appspot.com…",
    },
];

export default function ProductListing() {

    return <section
        className="bg-whtie py-12 sm:py-16"
    >
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mt-10 grid grid-cols gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
                {
                    fakeData && fakeData.length ?
                        fakeData.map(item =>
                            <article key={item._id}>
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