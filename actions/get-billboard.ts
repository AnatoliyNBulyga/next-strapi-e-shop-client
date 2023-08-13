import { Billboard } from "@/types";
import {$api} from "@/utils/http";
import qs from "qs";

const getBillboard = async (id: string): Promise<Billboard> => {

    const query = qs.stringify({
        populate: '*',
        filters: {
            id: {
                $eq: id,
            },
        }
    });

    const URL = `billboards?${query}`;

    const res = await $api.get(URL);
    return res.data.data[0]
}

export default getBillboard;