import ProductListing from "@/components/productListings";
import { productByCategory } from "@/services/product";




export default async function WomenAllProducts() {
    const getAllProducts = await productByCategory('women');



    return <ProductListing data={getAllProducts && getAllProducts.data} />
}