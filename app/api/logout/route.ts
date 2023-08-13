import { NextResponse } from "next/server";
import getLogoutUser from "@/actions/get-logout-user";

export async function GET() {

    const logout = await getLogoutUser();

    if (!logout) {
        return NextResponse.error();
    }

    return NextResponse.json({ message: 'success'}, { status: 200 });
}