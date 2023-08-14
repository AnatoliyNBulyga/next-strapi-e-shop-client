import {Product} from "@/types";
import qs from "qs";
import {$api} from "@/utils/http";


const getProduct = async (id: string): Promise<Product> => {

    const query = qs.stringify({
        populate: '*',
        filters: {
            id: {
                $eq: id,
            },
        }
    });

    const URL = `products?${query}`;

    const res = await $api.get(URL);
    return res.data.data[0]
}

export default getProduct;