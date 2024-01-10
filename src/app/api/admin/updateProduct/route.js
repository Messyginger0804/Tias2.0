import Product from "@/models/products";
import connectToDB from "@/mongodb";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';

export const Put = async (req) => {
    try {
        await connectToDB();
        const extractedData = await req.json();

        const {
            _id,
            name, price,
            description, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl
        } = extractedData

        const updatedProduct = await Product.findOneAndUpdate({
            _id: _id,
        }, {
            name, price,
            description, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl
        }, { new: true });

        if (updateProduct) {
            return NextResponse.json({
                success: true,
                message: "The product has been updated successfully.",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Failed to update. Please try again. If problem persists please contact your support.",
            });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}