"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Category} from "@/types";

interface MainNavProps {
    data: Category[],
}

const MainNav: React.FC<MainNavProps> = ({
    data,
}) => {

    const { categoryId } = useParams();

    const routes: { href: string, label: string, active: boolean }[] = data.map((route: Category) => ({
        href: `/category/${route?.id}`,
        label: route?.attributes?.name,
        active: categoryId === `${route?.id}`
    }));

    return (
        <nav className="flex items-center space-x-4 lg:space-x-6">
            {
                routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "text-sm h-10 flex items-center px-1 font-medium transition-color hover:text-black border-b-2 border-white",
                            route.active ? "text-black border-b-2 border-black" : "text-neutral-500",
                        )}
                    >
                        {route.label}
                    </Link>
                ))
            }
        </nav>
    );
};

export default MainNav;