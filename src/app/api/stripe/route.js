import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";
require('dotenv').config()

const key = process.env.STRIPE_KEY
// const user = process.env.MONGOUSER


const stripe = require("stripe")(`${key}`);

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const res = await req.json();

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: res,
                mode: "payment",
                success_url: "http://localhost:3000/checkout" + "?status=success",
                cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
            });

            return NextResponse.json({
                success: true,
                id: session.id,
            });
        } else {
            return NextResponse.json({
                success: true,
                message: "You are not authenticated",
            });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            status: 500,
            success: false,
            message: "Something went wrong ! Please try again",
        });
    }
}