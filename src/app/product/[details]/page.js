import { productById } from "@/services/product"


export default async function ProductDetails({ params }) {

    const productDetailsData = await productById(params.details);

    console.log(productDetailsData, '========HELLO WORLD============')

    return <ProductDetails items={productDetailsData && productDetailsData.data} />
}