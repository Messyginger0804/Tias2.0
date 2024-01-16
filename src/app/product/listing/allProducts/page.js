import ProductListing from "@/components/productListings";
import { getAllAdminProducts } from "@/services/product";




export default async function AllProducts() {

    const getAllProducts = await getAllAdminProducts();

    return <ProductListing data={getAllProducts && getAllProducts.data} />;
}