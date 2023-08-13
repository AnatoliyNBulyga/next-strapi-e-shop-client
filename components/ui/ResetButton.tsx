"use client";

import Button from "@/components/ui/button";
import {useRouter, useSearchParams} from "next/navigation";
import qsString from "query-string";

const ResetButton = () => {

    const router = useRouter();

    const handleClick = () => {

        const url = qsString.stringifyUrl({
            url: window.location.pathname,
        }, { skipNull: true });

        router.push(url, { scroll: false });
    }
    return (
        <Button
            onClick={handleClick}
            className="w-full rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300 hover:bg-black hover:text-white"
        >Reset All</Button>
    );
};

export default ResetButton;