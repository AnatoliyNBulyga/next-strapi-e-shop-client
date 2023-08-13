import { Size } from "@/types";
import qs from "qs";
import {$api} from "@/utils/http";

const getSizes = async (): Promise<Size[]> => {
    const query = qs.stringify({
        populate: '*',
    });

    const URL = `sizes?${query}`;

    const res = await $api.get(URL);

    return res.data.data;
}

export default getSizes;