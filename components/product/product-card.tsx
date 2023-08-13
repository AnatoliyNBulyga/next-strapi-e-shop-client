"use client";

import Image from "next/image";
import React, { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

import Currency  from "@/components/ui/currency";
import IconButton  from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import {LiaShoppingBagSolid} from "react-icons/lia";
import {GiExpand} from "react-icons/gi";

interface ProductCard {
    data: Product
}

const ProductCard: React.FC<ProductCard> = ({
    data
}) => {
    const previewModal = usePreviewModal();
    const cart = useCart();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    };

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        previewModal.onOpen(data);
    };

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        cart.addItem(data);
    };

    const imageSrc = `${process.env.NEXT_PUBLIC_UPLOAD_URL}${data.attributes.images?.data[0]?.attributes?.url}`;
    const alt = data.attributes.images?.data[0]?.attributes?.alternativeText ?? "Product preview";

    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            {/* Image & actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={imageSrc}
                    alt={alt}
                    fill
                    className="aspect-square object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            icon={<GiExpand size={20} className="text-gray-600" />}
                        />
                        <IconButton
                            onClick={onAddToCart}
                            icon={<LiaShoppingBagSolid size={20} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>
            {/* Description */}
            <div>
                <p className="font-semibold text-lg">{data.attributes?.name}</p>
                <p className="text-sm text-gray-500">{data.attributes?.category?.data.attributes?.name}</p>
                <p className="text-sm text-gray-500">{data.attributes?.sub_category?.data.attributes?.name}</p>
            </div>
            {/* Price & Reiew */}
            <div className="flex items-center justify-between">
                <Currency value={data.attributes?.price} />
            </div>
        </div>
    );
}

export default ProductCard;