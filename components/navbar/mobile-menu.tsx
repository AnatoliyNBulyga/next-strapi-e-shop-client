"use client";

import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";

import IconButton  from "@/components/ui/icon-button";
import Button from "@/components/ui/button";
import {Category, SubCategory} from "@/types";
import {AiOutlineMenu} from "react-icons/ai";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {useParams, usePathname} from "next/navigation";
import {IoClose} from "react-icons/io5";

interface MobileMenuProps {
    categories: Category[],
    subcategories: SubCategory[]
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    categories,
    subcategories
}) => {

    const [open, setOpen] = useState(false);
    const { categoryId = 1 } = useParams();
    const pathname = usePathname();

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    const categoryRoutes: { href: string, label: string, active: boolean }[] = categories.map((route: Category) => ({
        href: `/category/${route.id}`,
        label: route.attributes?.name,
        active: categoryId === `${route.id}`
    }));
    const subcategoryRoutes: { href: string, label: string, active: boolean }[] = subcategories.map((route: SubCategory) => ({
        href: `/category/${categoryId}/subcategory/${route.id}`,
        label: route.attributes?.name,
        active: pathname === `/category/${categoryId}/subcategory/${route.id}`
    }));

    return (
        <>
            <Button
                onClick={onOpen}
                className="sm:hidden bg-white text-black"
            >
                <AiOutlineMenu />
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

                                <div className="pt-4">
                                    <div className="border-b border-gray-100 mx-4 py-4">
                                        <h3 className="text-black font-bold">Categories</h3>
                                    </div>
                                    <div className="p-4">
                                        {
                                            categoryRoutes.map((route) => (
                                                <Link
                                                    key={route.href}
                                                    href={route.href}
                                                    className={cn(
                                                        "flex items-center mb-4 px-2 py-4 border-b border-gray-100 text-sm font-medium transition-colors hover:text-black hover:bg-gray-100",
                                                        route.active ? "text-black bg-gray-100" : "text-neutral-500",
                                                    )}
                                                >
                                                    {route.label}
                                                </Link>
                                            ))
                                        }
                                    </div>

                                    <div className="border-b border-gray-100 mx-4 py-4">
                                        <h3 className="text-black font-bold">Subcategories</h3>
                                    </div>

                                    <div className="p-4">
                                        {
                                            subcategoryRoutes.map((route) => (
                                                <Link
                                                    key={route.href}
                                                    href={route.href}
                                                    className={cn(
                                                        "flex items-center mb-4 px-2 py-4 border-b border-gray-100 text-sm font-medium transition-colors hover:text-black hover:bg-gray-100",
                                                        route.active ? "text-black bg-gray-100" : "text-neutral-500",
                                                    )}
                                                >
                                                    {route.label}
                                                </Link>
                                            ))
                                        }
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

export default MobileMenu;