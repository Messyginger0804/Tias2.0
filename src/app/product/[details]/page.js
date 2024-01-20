import { productById } from "@/services/product"


export default async function ProductDetails({ params }) {

    console.log('This is the params form product/details/page.js----->>>>>>', params)

    const productDetailsData = await productById(params.details);
    // const productDetailsData = params && params.details ? await productById(params.details) : null;


    // console.log(productDetailsData, '========HELLO WORLD============')

    return <ProductDetails items={productDetailsData && productDetailsData.data} />
}