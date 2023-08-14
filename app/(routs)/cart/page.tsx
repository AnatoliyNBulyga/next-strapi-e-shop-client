import ClientCart from "@/app/(routs)/cart/client-cart";
import getCurrentUser from "@/actions/get-current-user";

export const revalidate = 0;

const CartPage = async () => {
    const currentUser = await getCurrentUser();

    return (
        <ClientCart currentUser={currentUser}/>
    )
};

export default CartPage;