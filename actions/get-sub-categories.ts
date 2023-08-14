import { SubCategory } from "@/types";
import qs from "qs";
import {$api} from "@/utils/http";

const getSubCategories = async (): Promise<SubCategory[]> => {

    const query = qs.stringify({
        populate: "*",
    });

    const URL = `sub-categories?${query}`;

    const res = await $api.get(URL)

    return res.data.data;
}

export default getSubCategories;