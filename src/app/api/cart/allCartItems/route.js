import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import connectToDB from "@/mongodb";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);

        console.log(req.url, 'this is the req.url from the api/cart/allCartItems');

        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            console.log({ searchParams }, 'is the searchParams in api/cart/allCartItems');
            const id = searchParams.get('id');

            console.log(id, 'this is the id in api/cart/allCartItems');

            if (!id) return NextResponse.json({
                success: false,
                message: 'Please login first!',
            });

            const allCartItems = await Cart.find({ userID: id }).populate('productID');

            if (allCartItems) {
                return NextResponse.json({
                    success: true,
                    data: allCartItems,
                    message: 'You successfully got all the cart items',
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "No cart items were found!",
                    status: '204'
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
            message: "Sorry there is an error. (app/api/cart/allCartItems/route.js) Please try again",
        });
    }
}