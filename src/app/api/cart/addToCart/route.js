import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import connectToDB from "@/mongodb";
import Joi from "joi";
import { NextResponse } from "next/server";


const addToCart = Joi.object({
    userID: Joi.string().required(),
    productID: Joi.string().required(),
});


export const dynamic = 'force-dynamic';

export async function POST(reg) {
    try {

        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const data = await req.json();
            const { productID, userID } = data;

            const { error } = addToCart.validate({ userId, productID });

            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                });
            }

            const isCurrentCartItemExistsAlready = await Cart.find({
                productId: productID,
                userId: userID
            })

            if (isCurrentCartItemExistsAlready) {
                return NextResponse.json({
                    success: false,
                    message: "Product already added in the cart! Please add a different product",
                });
            }

            const saveProductToCart = await Cart.create(data);

            if (saveProductToCart) {
                return NextResponse.json({
                    success: true,
                    message: "Product is added to cart !",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "failed to add product to cart ! Please try again.",
                });
            }

        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated",
            });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! (src/app/api/cart/addToCart/route.js) Please try again later",
        });
    }
}