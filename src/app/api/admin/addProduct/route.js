import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
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

        // check if user is authenticated
        // const user = 'admin'

        const isAuthUser = await AuthUser(req);

        console.log('------>>>>> LOOK RIGHT HERE', isAuthUser);

        // check if user is an admin
        if (isAuthUser?.role == 'admin') {
            const extractData = await req.json()

            const {
                name, description, price, imageUrl, category, sizes, deliveryInfo, onSale, priceDrop,
            } = extractData

            const { error } = AdminAddNewProductSchema.validate({
                name, description, price, imageUrl, category, sizes, deliveryInfo, onSale, priceDrop,
            })

            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                });
            }

            const newlyCreatedProduct = await Product.create(extractData);

            if (newlyCreatedProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Product added successfully",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to add the product check your data then try again",
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not autorized for this action!",
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
