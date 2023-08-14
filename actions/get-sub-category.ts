import {SubCategory} from "@/types";
import qs from "qs";
import {$api} from "@/utils/http";

const getSubCategory = async (id: string): Promise<SubCategory> => {

    const query = qs.stringify({
        populate: {
            populate: '*',
            billboard: {
                populate: '*',
            }
        },
        filters: {
            id: {
                $eq: id,
            },
        }
    });

    const URL = `sub-categories?${query}`;

    const res = await $api.get(URL)

    return res.data.data[0];

}

export default getSubCategory;