import { SubCategory } from "@/types";
import qs from "qs";
import {$api} from "@/utils/http";

const getSubCategories = async (): Promise<SubCategory[] | null> => {

    const query = qs.stringify({
        populate: "*",
    });

    const URL = `sub-categories?${query}`;

    try {
        const res = await $api.get(URL)

        return res.data.data;

    } catch (error) {
        console.log(error, 'Error from get sub categories');
        return null;
    }
}

export default getSubCategories;