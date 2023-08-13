"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

interface CurrencyProps {
    value?: string | number;
    classes?: string;
}

const Currency: React.FC<CurrencyProps> = ({
   value = 0,
   classes = "",
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className={`${classes ? classes + " " : ""}font-semibold`}>
            {formatter.format(Number(value))}
        </div>
    );
}

export default Currency;