"use client";

import Currency  from "@/components/ui/currency";
import Button from "@/components/ui/button";
import {Color, Product, Size} from "@/types";
import { MdAddShoppingCart } from "react-icons/md";
import {useState} from "react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import useCart from "@/hooks/use-cart";

interface InfoProps {
    data: Product
};

const Info: React.FC<InfoProps> = ({ data }) => {

    console.log('info data ', data)

    const [quantity, setQuantity] = useState(1);
    const cart = useCart();
    const onAddToCart = () => {
        cart.addItem(data, quantity);
    }

    const sizes = data?.attributes?.sizes?.data;
    const colors = data?.attributes?.colors?.data;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data?.attributes?.name}</h1>
            <div className="mt-3 flex items-end justify-between mb-4">
                <div className="text-2xl text-gray-900">
                    <Currency value={data?.attributes?.price} />
                </div>
            </div>
            <p className="text-lg font-normal text-gray-500">{data?.attributes?.desc}</p>
            <hr className="my-4" />
            <div className="flex items-center w-[180px] justify-between my-8">
                <Button
                    className="bg-white text-black border border-black hover:shadow-lg"
                    onClick={() =>
                        setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                >
                    <AiOutlineMinus />
                </Button>
                <span className="flex justify-center w-4 font-bold">
                    {quantity}
                </span>

                <Button
                    className="bg-white text-black border border-black hover:shadow-lg"
                    onClick={() => setQuantity((prev) => prev + 1)}
                >
                    <AiOutlinePlus />
                </Button>
            </div>
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Sizes:</h3>
                    {
                        sizes?.length > 0 && sizes.map((size: Size, index, arr) => (
                            <div
                                key={size.id}
                                className={`${index < arr.length - 1 ? "border-r border-gray-300 pr-3" : ""}`}
                            >
                                {size.attributes?.name}
                            </div>
                        ))
                    }

                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Colors:</h3>
                    {
                        colors?.length > 0 && colors.map((color: Color) => (
                            <div
                                key={color.id}
                                className="h-6 w-6 rounded-full border border-gray-600"
                                style={{ backgroundColor: color.attributes?.value }}
                            />
                        ))
                    }

                </div>
            </div>
            <div className="my-10 flex items-center gap-x-3">
                <Button
                    onClick={onAddToCart}
                    className="flex justify-center items-center gap-x-8 max-sm:w-full"
                >
                    Add To Cart
                    <MdAddShoppingCart size={20} />
                </Button>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Category:</span>
                    <span>{data?.attributes?.category?.data.attributes?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Product type:</span>
                    <span>{data?.attributes?.sub_category?.data.attributes?.name}</span>
                </div>
            </div>
        </div>
    );
}

export default Info;