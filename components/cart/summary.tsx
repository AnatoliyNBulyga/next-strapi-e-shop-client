"use client";

import { useEffect } from "react";
import {useRouter, useSearchParams} from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import {stripePromise} from "@/lib/stripe";
import {$api} from "@/utils/http";



interface SummaryProps {
    totalPrice: number;
}
const Summary: React.FC<SummaryProps> = ({
    totalPrice
}) => {
    const searchParams = useSearchParams();
    const products = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);
    const router = useRouter();

    useEffect(() => {
        if (searchParams.get('success')) {
            toast.success('Payment completed.');
            removeAll();
            setTimeout(() => {
                router.push("/")
            }, 2000)
        }

        if (searchParams.get('canceled')) {
            toast.error('Something went wrong.');
        }
    }, [searchParams, removeAll, router]);

    const onCheckout = async () => {
        try {
            const stripe = await stripePromise;
            const response = await $api.post("/orders", {
                products
            });

            await stripe?.redirectToCheckout({
                sessionId: response.data.stripeSession.id
            });
        } catch (error) {
            console.log(error, "stripe error")
        }
    }

    return (
        <div
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
            <h2 className="text-lg font-medium text-gray-900">
                Order summary
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">Order total</div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button onClick={onCheckout} disabled={products.length === 0} className="w-full mt-6">
                Checkout
            </Button>
        </div>
    );
}

export default Summary;