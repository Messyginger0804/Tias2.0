


import { getAllAdminProducts } from "@/services/product";

import ProductListing from "@/components/productListings";



export default async function AdminAllProducts() {

    const allAdminProducts = await getAllAdminProducts();

    // console.log(allAdminProducts);

    return (<ProductListing data={allAdminProducts && allAdminProducts.data} />);
}