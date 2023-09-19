import {StrapiImageType} from "@/types";

export const getSrc = (source: StrapiImageType) => {
    return source?.attributes?.url;
}