import {StrapiImageType} from "@/types";

export const getSrc = (source: StrapiImageType) => {
    return `${process.env.NEXT_PUBLIC_UPLOAD_URL}${source?.attributes?.url}`;
}