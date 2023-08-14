import { Billboard } from "@/types";
import {$api} from "@/utils/http";
import qs from "qs";

const getBillboard = async (id: string): Promise<Billboard | null> => {

    const query = qs.stringify({
        populate: '*',
        filters: {
            id: {
                $eq: id,
            },
        }
    });

    const URL = `billboards?${query}`;

    try {
        const res = await $api.get(URL);
        return res.data.data[0]

    } catch (error) {
        console.log(error, 'Error from get billboards');
        return null;
    }


}

export default getBillboard;