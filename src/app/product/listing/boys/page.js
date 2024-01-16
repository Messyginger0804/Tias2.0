import ProductListing from "@/components/productListings";
import { productByCategory } from "@/services/product";




export default async function BoysAllProducts() {
    const getAllProducts = await productByCategory('boys');



    return <ProductListing data={getAllProducts && getAllProducts.data} />
}