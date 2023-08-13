"use client";

import Button from "@/components/ui/button";
import {useEffect, useMemo, useState} from "react";
import useCart from "@/hooks/use-cart";
import {useRouter} from "next/navigation";
import {LiaShoppingBagSolid} from "react-icons/lia";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const cart = useCart();

    const count = useMemo(() => {
        return cart.items.reduce((total, item) => {
            return total + item.quantity
        }, 0);
    }, [cart]);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex items-center gap-x-4">
            <Button
                onClick={() => router.push("/cart")}
                className="relative flex items-center bg-transparent text-black sm:px-4 px-2 py-2"
            >
                <LiaShoppingBagSolid
                    size={20}
                    color="black"
                />
                {
                    count > 0 && (
                        <span className="absolute animate-bounce top-0 left-8 w-5 h-5 rounded-full bg-yellow-400 flex justify-center items-center">
                            <span className="text-xs font-bold text-black">
                                {count}
                            </span>
                        </span>
                    )
                }
            </Button>
        </div>
    );
};

export default NavbarActions;