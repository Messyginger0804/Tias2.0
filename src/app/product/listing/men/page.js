import ProductListing from "@/components/productListings";
import { productByCategory } from "@/services/product";




export default async function MenAllProducts() {
    const getAllProducts = await productByCategory('men');

    console.log(getAllProducts);



    return <ProductListing data={getAllProducts && getAllProducts.data} />
}

// export default async function AllProducts() {

//     const getAllProducts = await getAllAdminProducts();

//     return <ProductListing data={getAllProducts && getAllProducts.data} />;
// }