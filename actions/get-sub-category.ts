import {SubCategory} from "@/types";
import qs from "qs";
import {$api} from "@/utils/http";

const getSubCategory = async (id: string): Promise<SubCategory | null> => {

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

    try {
        const res = await $api.get(URL)

        return res.data.data;

    } catch (error) {
        console.log(error, 'Error from get sub category by id');
        return null;
    }

}

export default getSubCategory;