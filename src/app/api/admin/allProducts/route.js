import Product from "@/models/products";
import connectToDB from "@/mongodb";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';


export async function GET(req) {

    try {
        await connectToDB();

        const user = 'admin';

        // if (user === 'admin') {

        const extractAllProducts = await Product.find({});

        if (extractAllProducts) {
            return NextResponse.json({
                success: true,
                data: extractAllProducts,
                message: "Welcome back admin. Here is your products to edit or delete.",
            })
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "No products found. Refresh your page if error presist contact support.",
            });

        }
        // } else {
        //     return NextResponse.json({
        //         success: false,
        //         message: "You are not autorized for this action!",
        //     });
        // }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}


