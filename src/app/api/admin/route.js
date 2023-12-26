import connectToDB from "@/mongodb";
import Joi from "joi";
import { NextResponse } from "next/server";

const AdminAddNewProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    sizes: Joi.array().required(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    priceDrop: Joi.number().required(),
    imageUrl: Joi.string().required(),
})



export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        await connectToDB()
    } catch (error) {
        console.error(error, 'Error connecting in addProduct route');

        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}
