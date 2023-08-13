
import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/navbar/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar/navbar-actions";
import getSubCategories from "@/actions/get-sub-categories";
import SubNav from "@/components/navbar/sub-nav";
import UserMenu from "@/components/navbar/user-menu";
import getCurrentUser from "@/actions/get-current-user";
import MobileMenu from "@/components/navbar/mobile-menu";

export const revalidate = 0; // It's never cached;

const Navbar = async () => {
    const categories = await getCategories();
    const subCategories = await getSubCategories();
    const currentUser = await getCurrentUser();

    console.log('currentUser ', currentUser);

    return (
        <div className="border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                    <MobileMenu categories={categories} subcategories={subCategories} />
                    <div className="hidden sm:flex">
                        <MainNav data={categories} />
                    </div>

                    <Link href="/">
                        <span className="font-extrabold text-2xl">A-STORE</span>
                    </Link>
                    <div className="flex items-center">
                        <UserMenu currentUser={currentUser} />
                        <NavbarActions />
                    </div>
                </div>
            </Container>
            <div className="bg-gray-100 hidden sm:block">
                <Container>
                    <div className="px-4 sm:px-6 lg:px-8 flex items-center h-12">
                        <SubNav subcategories={subCategories} />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;