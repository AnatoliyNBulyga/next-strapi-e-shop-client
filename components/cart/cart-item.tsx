"use client";

import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import {Color, Product, Size} from "@/types";
import {IoClose} from "react-icons/io5";
import Button from "@/components/ui/button";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Link from "next/link";


interface CartItemProps {
    data: { product: Product, quantity: number };
    totalPrice: number
}

const CartItem: React.FC<CartItemProps> = ({
   data,
   totalPrice
}) => {

    console.log('data ', data)
    const cart = useCart();

    const onRemove = () => {
        cart.removeItem(data?.product?.id);
    };

    const sizes = data?.product?.attributes?.sizes?.data;
    const colors = data?.product?.attributes?.colors?.data;

    const imageSrc = data?.product?.attributes?.images?.data[0]?.attributes?.url;
    const alt = data?.product?.attributes?.images?.data[0]?.attributes?.alternativeText ?? "Product preview";

    return (
        <li className="flex py-6 border-b">
            <Link href={`/product/${data?.product?.id}`} className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image
                    fill
                    src={imageSrc}
                    alt={alt}
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </Link>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton onClick={onRemove} icon={<IoClose size={15} />} />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:pr-0">
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <p className=" text-lg font-semibold text-black">
                                {data.product?.attributes.name}
                            </p>
                        </div>

                        <div className="flex items-center w-[120px] justify-between my-4">
                            <Button
                                className="bg-white text-black border border-black hover:shadow-lg px-3 py-2"
                                onClick={() => cart.decreaseQuantity(data.product)}
                            >
                                <AiOutlineMinus />
                            </Button>
                            <span className="flex justify-center w-4 font-bold">
                                {data.quantity}
                            </span>

                            <Button
                                className="bg-white text-black border border-black hover:shadow-lg px-3 py-2"
                                onClick={() => cart.increaseQuantity(data.product)}
                            >
                                <AiOutlinePlus />
                            </Button>
                        </div>

                        <div className="mt-1 flex flex-col text-sm mb-6">
                            {
                                colors?.length > 0 &&
                                <div className="flex items-center gap-3 mb-2">
                                    {
                                        colors.map((color: Color) => (
                                            <div
                                                key={color.id}
                                                className="h-6 w-6 rounded-full border border-gray-600"
                                                style={{ backgroundColor: color.attributes?.value }}
                                            />
                                        ))
                                    }
                                </div>
                            }
                            {
                                sizes?.length > 0 &&
                                <div className="flex items-center mb-2">
                                    {
                                        sizes.map((size: Size, index, arr) => (

                                            <span
                                                key={size.id}
                                                className={`text-gray-500${index < arr.length - 1 ? " mr-2 border-r border-gray-200 pr-2" : ""}`}
                                            >
                                                {size.attributes?.name}
                                            </span>
                                        ))
                                    }
                                </div>

                            }

                        </div>
                        <div className="flex items-end gap-2">
                            <span className="max-sm:hidden">Price per one item:</span> <Currency value={data.product?.attributes?.price} />
                        </div>

                        <div className="flex items-end gap-2">
                            <span>Total:</span> <Currency value={totalPrice} classes="text-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default CartItem;