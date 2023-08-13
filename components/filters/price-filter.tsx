"use client";

import {useState} from "react";
import MultiRangeSlider from "multi-range-slider-react";
import qsString from "query-string";

import {useRouter, useSearchParams} from "next/navigation";
import Button from "@/components/ui/button";

import "./filters.css"


const PriceFilter = () => {
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(5000);
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleInput = (e: any) => {
        setMinPrice(e.minValue);
        setMaxPrice(e.maxValue);
    };

    const handleClick = () => {
        const current = qsString.parse(searchParams.toString());

        const query = {
            ...current,
            minPrice,
            maxPrice
        }

        const url = qsString.stringifyUrl({
            url: window.location.href,
            query,
        }, { skipNull: true });


        router.push(url, { scroll: false });
    }

    return (
        <div className="">
            <div className="relative flex flex-col">
                <div className="flex justify-between items-ceter"><span>${minPrice}</span><span>${maxPrice}</span></div>
                <MultiRangeSlider
                    className="custom"
                    min={0}
                    max={5000}
                    step={5}
                    minValue={minPrice}
                    maxValue={maxPrice}
                    onInput={(e) => {
                        handleInput(e);
                    }}
                    label={false}
                    ruler={false}
                    barLeftColor="#94a3b8"
                    barInnerColor="black"
                    barRightColor="#94a3b8"
                    thumbLeftColor="white"
                    thumbRightColor="white"
                />

                <Button
                    onClick={handleClick}
                    className="rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300 hover:bg-black hover:text-white"
                >Apply</Button>

            </div>
        </div>
    );
};

export default PriceFilter;