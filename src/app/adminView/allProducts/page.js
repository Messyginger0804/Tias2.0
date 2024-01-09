


// import { getAllAdminProducts } from "@/services/product";

import ProductListing from "@/components/productListings";



export default async function AdminAllProducts() {
    return (
        <ProductListing />
    )

    // const allAdminProducts = await getAllAdminProducts()

    // return <CommonListing data={allAdminProducts && allAdminProducts.data} />
}