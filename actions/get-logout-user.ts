import { cookies } from "next/headers";

const getLogoutUser = async (): Promise<any> => {

    const jwtCookie = cookies().get('jwt');
    const userCookie = cookies().get('current_user');

    if (!jwtCookie || !userCookie) {
        return null;
    }

    cookies().delete('jwt')
    cookies().delete('current_user')

    return { message: 'success' };
}

export default getLogoutUser;