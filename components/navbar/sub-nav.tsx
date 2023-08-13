"use client";

import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {SubCategory} from "@/types";

interface SubNavProps {
    subcategories: SubCategory[],
}

const SubNav: React.FC<SubNavProps> = ({
    subcategories
}) => {

    const {categoryId = 1} = useParams();
    const pathname = usePathname();

    const routes: { href: string, label: string, active: boolean }[] = subcategories.map((route: SubCategory) => ({
        href: `/category/${categoryId}/subcategory/${route.id}`,
        label: route.attributes?.name,
        active: pathname === `/category/${categoryId}/subcategory/${route.id}`
    }));

    return (
        <nav className="flex items-center">
            {
                routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "h-12 flex items-center px-2 text-sm font-medium transition-color hover:text-black hover:bg-white border-b-2 border-transparent",
                            route.active ? "text-black border-b-2 border-black bg-white" : "text-neutral-500",
                        )}
                    >
                        {route.label}
                    </Link>
                ))
            }
        </nav>
    );
};

export default SubNav;