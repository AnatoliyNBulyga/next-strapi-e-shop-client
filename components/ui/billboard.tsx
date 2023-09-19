"use client";

import { Billboard as BillboardType } from "@/types";
import TypewriterComponent from "typewriter-effect";

interface BillboardProps {
    data: BillboardType;
    bgPosition?: "top" | "center"
}

const Billboard: React.FC<BillboardProps> = ({
    data,
    bgPosition = "top"
}) => {
    const imageSrc = data?.attributes?.image?.data?.attributes?.url;

    return (
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <div style={{ backgroundImage: `url(${imageSrc})`, backgroundPosition: bgPosition }} className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
                <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                    <div className="w-2/3 bg-white bg-opacity-70 p-10 rounded-xl font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                        <TypewriterComponent
                            options={{
                                strings: data?.attributes?.label,
                                autoStart: true,
                                loop: true
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Billboard;