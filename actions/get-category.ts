import {Category} from "@/types";
import qs from "qs";
import {$api} from "@/utils/http";

const getCategory = async (id: string): Promise<Category | null> => {

    const query = qs.stringify({
        populate: '*',
        filters: {
            id: {
                $eq: id,
            },
        }
    });

    const URL = `categories?${query}`;

    try {
        const res = await $api.get(URL);
        return res.data.data[0]

    } catch (error) {
        console.log(error, 'Error from get category');
        return null;
    }
}

export default getCategory;