import {Product} from "@/types";
import qs from "qs";
import {$api} from "@/utils/http";


const getProduct = async (id: string): Promise<Product | null> => {

    const query = qs.stringify({
        populate: '*',
        filters: {
            id: {
                $eq: id,
            },
        }
    });

    const URL = `products?${query}`;

    try {
        const res = await $api.get(URL);
        return res.data.data[0]

    } catch (error) {
        console.log(error, 'Error from get product by id');
        return null;
    }
}

export default getProduct;