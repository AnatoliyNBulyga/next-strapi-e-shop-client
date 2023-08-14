import Container from "@/components/ui/container";
import Billboard from "@/components/ui/billboard";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product/product-list";
import { ProductType } from "@/types";

const HomePage = async () => {
    const featuredProducts = await getProducts({type: ProductType.Featured});
    const trandingProducts = await getProducts({type: ProductType.Trending});
    const billboard = await getBillboard("1");

    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard} />
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <ProductList title="Featured Products" items={featuredProducts} />
                </div>
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <ProductList title="Tranding Products" items={trandingProducts} />
                </div>
            </div>
        </Container>
    );
};

export default HomePage;