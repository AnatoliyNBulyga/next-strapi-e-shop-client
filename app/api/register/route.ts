import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
) {
    const body = await request.json();
    const {
        email,
        username,
        password
    } = body;

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL ?? "/"}auth/local/register`, {
            email, username, password
        })

        return NextResponse.json(response.data);
    } catch (error: any) {
        // handle errors
        console.log('[API REGISTER ERROR]: ', error)
        return NextResponse.error();
    }
}