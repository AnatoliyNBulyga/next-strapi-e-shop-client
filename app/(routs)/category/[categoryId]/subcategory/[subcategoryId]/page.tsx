import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import Filter from "@/components/filters/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/product/product-card";
import MobileFilter from "@/components/filters/mobile-filter";
import getSubCategory from "@/actions/get-sub-category";
import { Billboard as BillboardType } from "@/types";
import PriceFilter from "@/components/filters/price-filter";
import ResetButton from "@/components/ui/ResetButton";


export const revalidate = 0;

interface SubCategoryPageProps {
    params: {
        categoryId: string;
        subcategoryId: string;
    },
    searchParams: {
        colorId: string;
        sizeId: string;
    }
}

const SubCategoryPage: React.FC<SubCategoryPageProps> = async ({
   params,
   searchParams
}) => {

    const products = await getProducts({
        ...params,
        ...searchParams
    })

    const sizes = await getSizes();
    const colors = await getColors();
    const subcategory = await getSubCategory(params.subcategoryId);
    const billboard = subcategory?.attributes?.billboard as unknown as { data: BillboardType };

    return (
        <div className="bg-white">
            <Container>
                <Billboard
                    data={billboard?.data}
                    bgPosition="center"
                />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilter
                            sizes={sizes}
                            colors={colors}
                        />
                        <div className="hidden lg:block">
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
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {
                                products.length > 0
                                    ?
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {
                                            products.map((item) =>(
                                                <ProductCard key={item.id} data={item} />
                                            ))
                                        }
                                    </div>
                                    : <NoResults />
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default SubCategoryPage;