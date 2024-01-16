import { NextResponse } from "next/server";
import connectToDB from "@/mongodb";
import Product from "@/models/products";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        console.log("Received product ID:=======================>", id);  // Log the received ID
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Product ID is required",
            });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json({
                success: false,
                message: "Product not found or already deleted",
            });
        }

        return NextResponse.json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again later",
        });
    }
}
