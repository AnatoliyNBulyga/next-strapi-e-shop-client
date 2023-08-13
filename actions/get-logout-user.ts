import { cookies } from "next/headers";

const getLogoutUser = async (): Promise<any> => {

    const jwtCookie = cookies().get('jwt');
    const userCookie = cookies().get('current_user');
    const koaSessSigCookie = cookies().get('koa.sess.sig');
    const koaSessCookie = cookies().get('koa.sess');

    if (!jwtCookie || !userCookie) {
        return null;
    }

    cookies().delete('jwt')
    cookies().delete('current_user')

    if (!koaSessSigCookie || !koaSessCookie) {
        return null;
    }

    cookies().delete('koa.sess.sig')
    cookies().delete('koa.sess')

    return { message: 'success' };
}

export default getLogoutUser;