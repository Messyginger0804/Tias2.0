import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import connectToDB from "@/mongodb";
import { NextResponse } from "next/server";




export const dynamic = 'force-dynamic';

export async function DELETE(req) {
    try {

        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {

            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');

            if (!id) return NextResponse.json({
                success: false,
                message: 'Cart item ID is required',
            });


            const deleteCartItem = await Cart.findByIdAndDelete(id);

            if (deleteCartItem) {
                return NextResponse.json({
                    success: true,
                    message: 'Cart item deleted successfully',
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'Failed to delete Cart item ! Please try again',
                })
            }

        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authorized to delete",
            });
        }


    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Sorry there is an error. (app/api/cart/deleteFromCart/route.js) Please try again",
        });
    }
}