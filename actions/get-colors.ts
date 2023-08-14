import { Color } from "@/types";
import qs from "qs";
import {$api} from "@/utils/http";

const getColors = async (): Promise<Color[] | null> => {
    const query = qs.stringify({
        populate: '*',
    });

    const URL = `colors?${query}`;

    try {
        const res = await $api.get(URL);
        return res.data.data[0]

    } catch (error) {
        console.log(error, 'Error from get colors');
        return null;
    }
}

export default getColors;