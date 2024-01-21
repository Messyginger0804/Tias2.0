import ProductDetails from "@/components/productDetails";
import { productById } from "@/services/product"


export default async function DetailsPage({ params }) {

    // console.log('This is the params form product/details/page.js----->>>>>>', params)
    // console.log('god damn fucking shit----->>>>>>', params.details)

    const productDetailsData = await productById(params.details);

    // const productDetailsData = params && params.details ? await productById(params.details) : null;


    console.log(productDetailsData, '========HELLO WORLD============')

    return <ProductDetails item={productDetailsData && productDetailsData.data} />
}