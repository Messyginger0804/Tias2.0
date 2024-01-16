import Product from "@/models/products";
import connectToDB from "@/mongodb";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';

export const GET = async (req) => {
    try {

        await connectToDB();
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('id');

        if (!productId) {
            return NextResponse.json({
                success: false,
                status: 404,
                message: 'Product id not found.',
            })
        }

        const getData = await Product.findById({ _id: productId });

        if (getData) {
            return NextResponse.json({
                success: true,
                data: getData[0],
                status: 200,
                message: 'Product found and return successfully.'
            })
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                messsage: "No Product found. Refresh the page and try again"
            })
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! (api/client/product/productId) Please try again later",
        });
    }
}