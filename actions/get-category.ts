import {Category} from "@/types";
import qs from "qs";
import {$api} from "@/utils/http";

const fakeData = {
    id: '1',
    name: 'Men',
}

const getCategory = async (id: string): Promise<Category> => {

    const query = qs.stringify({
        populate: '*',
        filters: {
            id: {
                $eq: id,
            },
        }
    });

    const URL = `categories?${query}`;

    const res = await $api.get(URL);

    return res.data.data[0];
}

export default getCategory;