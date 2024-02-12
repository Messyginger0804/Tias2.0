import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Order from "@/models/order";
import connectToDB from "@/mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const data = await req.json();
            const { user } = data;

            const newOrder = await Order.create(data);

            if (newOrder) {
                await Cart.deleteMany({ userID: user });

                return NextResponse.json({
                    success: true,
                    message: "Products are on the way !",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to create a order ! Please try again",
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authticated",
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong in (src/app/api/order/createOrder/route.js) ! Please try again later",
        });
    }
}