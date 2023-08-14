import qs from "qs";

import {Product, ProductType} from "@/types";
import {$api} from "@/utils/http";

interface Query {
    categoryId?: string;
    subcategoryId?: string;
    colorId?: string;
    sizeId?: string;
    isNew?: string;
    type?: ProductType;
    minPrice?: string;
    maxPrice?: string;
}

const getProducts = async ({
    categoryId,
    subcategoryId,
    colorId,
    sizeId,
    isNew,
    type,
    minPrice = '0',
    maxPrice = '5000'
}: Query): Promise<Product[]> => {

    const queryParams = qs.stringify({
        populate: '*',
        filters: {
            ...(categoryId ? { category: { id: { $eq: categoryId } } } : {}),
            ...(subcategoryId ? { sub_category: { id: { $eq: subcategoryId } } } : {}),
            ...(sizeId ? { sizes: { id: { $eq: sizeId } } } : {}),
            ...(colorId ? { colors: { id: { $eq: colorId } } } : {}),
            ...(isNew ? { isNew: true } : {}),
            ...(type ? { type: type } : {}),
            price: { $between: [Number(minPrice), Number(maxPrice)] }
        }
    });

    const URL = `products?${queryParams}`;

    const res = await $api.get(URL)

    return res.data.data;

}

export default getProducts;