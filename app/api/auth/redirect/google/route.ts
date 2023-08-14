import axios from "axios";
import {NextRequest} from "next/server";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export async function GET(
    request: NextRequest
) {

    const { searchParams } = new URL(request.url)
    const accessToken = searchParams.get('access_token')

    const provider = 'google';

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}auth/${provider}/callback?access_token=${accessToken}`)

    if (res.status !== 200) {
        throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
    }

    console.log('res.data ', res.data)

    cookies().set({
        name: "jwt",
        value: res.data.jwt,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 10, // cookie expires after 10 days.
        sameSite: "strict",
        path: "/",
    })
    cookies().set({
        name: "current_user",
        value: JSON.stringify(res.data.user),
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 10, // cookie expires after 10 days.
        sameSite: "strict",
        path: "/",
    })

    redirect('/');
}