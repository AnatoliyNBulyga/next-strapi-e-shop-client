import { cookies } from "next/headers";

const getCurrentUser = async (): Promise<any> => {

    const jwtCookie = cookies().get('jwt');
    const userCookie = cookies().get('current_user');

    if (!jwtCookie || !userCookie) {
        return null;
    }

    return { user: JSON.parse(userCookie.value), jwt: jwtCookie.value};
}

export default getCurrentUser;