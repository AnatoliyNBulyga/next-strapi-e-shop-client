import { Category } from "@/types";
import qs from "qs";
import {$api} from "@/utils/http";

const getCategories = async (): Promise<Category[] | null> => {

    const query = qs.stringify({
        populate: '*',
    });

    const URL = `categories?${query}`;

    const res = await $api.get(URL);
    return res.data.data
}

export default getCategories;