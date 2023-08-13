import axios from "axios";
import { NextResponse } from "next/server";
import {cookies} from "next/headers";

export async function POST(
    request: Request,
) {
    const body = await request.json();
    const {
        identifier,
        password
    } = body;

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL ?? "/"}auth/local`, {
            identifier, password
        })
        cookies().set({
            name: "jwt",
            value: response.data.jwt,
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 10, // cookie expires after 10 days.
            sameSite: "strict",
            path: "/",
        })
        cookies().set({
            name: "current_user",
            value: JSON.stringify(response.data.user),
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 10, // cookie expires after 10 days.
            sameSite: "strict",
            path: "/",
        })
        return NextResponse.json(response.data);
    } catch (error: any) {
        // handle errors
        console.log('[API LOGIN ERROR]: ', error)
        if (error.response.status === 400) {
            console.log('400')
            NextResponse.json({message: 'Your identifier or password was wrong!'}, { status: 400 })
        }
        return NextResponse.error();
    }
}