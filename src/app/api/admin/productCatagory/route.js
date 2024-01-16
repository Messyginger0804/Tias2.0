import connectToDB from "@/mongodb";
import { getAllAdminProducts } from "@/services/product";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';


export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const getData = await Product.find({ category: id });

        if (getData) {
            return NextResponse.json({
                succes: true, data: getData
            })
        } else {
            return NextResponse.json({
                succes: false, status: 204, message: "No Product found !"
            });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}