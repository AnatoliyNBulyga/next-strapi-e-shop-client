import { Color } from "@/types";
import qs from "qs";
import {$api} from "@/utils/http";

const getColors = async (): Promise<Color[]> => {
    const query = qs.stringify({
        populate: '*',
    });

    const URL = `colors?${query}`;

    const res = await $api.get(URL);

    return res.data.data;
}

export default getColors;