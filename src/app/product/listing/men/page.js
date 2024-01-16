import ProductListing from "@/components/productListings";
import { productByCategory } from "@/services/product";




export default async function MenAllProducts() {
    const getAllProducts = await productByCategory('men');



    return <ProductListing data={getAllProducts && getAllProducts.data} />
}