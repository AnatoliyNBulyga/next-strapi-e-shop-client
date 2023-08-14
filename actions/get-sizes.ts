import { Size } from "@/types";
import qs from "qs";
import {$api} from "@/utils/http";

const getSizes = async (): Promise<Size[] | null> => {
    const query = qs.stringify({
        populate: '*',
    });

    const URL = `sizes?${query}`;

    try {
        const res = await $api.get(URL)

        return res.data.data;

    } catch (error) {
        console.log(error, 'Error from get sizes');
        return null;
    }
}

export default getSizes;