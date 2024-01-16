import ProductListing from "@/components/productListings";
import { productByCategory } from "@/services/product";




export default async function GirlsAllProducts() {
    const getAllProducts = await productByCategory('girls');



    return <ProductListing data={getAllProducts && getAllProducts.data} />
}