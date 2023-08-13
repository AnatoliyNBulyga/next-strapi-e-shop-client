"use client";

import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";

import IconButton  from "@/components/ui/icon-button";
import Button from "@/components/ui/button";
import { Color, Size } from "@/types";

import Filter from "./filter";
import {IoClose} from "react-icons/io5";
import {BiPlus} from "react-icons/bi";
import PriceFilter from "@/components/filters/price-filter";
import ResetButton from "@/components/ui/ResetButton";

interface MobileFiltersProps {
    sizes: Size[],
    colors: Color[],
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
     sizes,
     colors
 }) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <>
            <Button
                onClick={onOpen}
                className="flex items-center gap-x-2 lg:hidden"
            >
                Filters
                <BiPlus size={20} />
            </Button>

            <Transition
                show={open} appear as={Fragment}
            >
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={onClose}>

                    {/* Background color and opacity */}
                    <div className="fixed inset-0 bg-black bg-opacity-25" />

                    {/* Dialog position */}
                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-70 transform -translate-x-4"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-80 transform -translate-x-6"
                        >
                            <Dialog.Panel className="relative mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">

                                {/* Close button */}
                                <div className="flex items-center justify-end px-4">
                                    <IconButton icon={<IoClose size={15} />} onClick={onClose} />
                                </div>

                                <div className="p-4">
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold mb-2">Filter by price</h3>
                                        <PriceFilter />
                                    </div>
                                    <Filter
                                        valueKey="sizeId"
                                        name="Sizes"
                                        data={sizes}
                                    />
                                    <Filter
                                        valueKey="colorId"
                                        name="Colors"
                                        data={colors}
                                    />
                                    <div className="mb-8">
                                        <ResetButton />
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default MobileFilters;