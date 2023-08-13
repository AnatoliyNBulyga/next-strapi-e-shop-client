export interface Product {
    id: string;
    attributes: {
        category: {
            data: Category
        };
        sub_category: {
            data: SubCategory
        };
        name: string;
        desc: string;
        price: number;
        isNew: boolean;
        sizes: {
            data: Size[]
        };
        colors: {
            data: Color[]
        };
        images: {
            data: StrapiImageType[]
        }
        type: ProductType
    }
};

export interface Billboard {
    id: number;
    attributes: {
        label: string;
        image: {
            data: StrapiImageType
        };
    }
};

export interface SubCategory {
    id: number;
    attributes: {
        name: string;
        billboard: Billboard;
    }
};

export type Category = {
    id: number,
    attributes: {
        name: string,
    }
};

export type Size = {
    id: string,
    attributes: {
        name: string,
        value: string,
    }
};

export type Color = {
    id: string,
    attributes: {
        name: string,
        value: string,
    }
};

export type StrapiImageType = {
    id: number
    attributes: {
        alternativeText: string
        url: string
        height?: number
        width?: number
        caption?: string
        ext?: string
        formats?: {
            large?: { url?: string }
            xlarge?: { url?: string }
            small?: { url?: string }
            medium?: { url?: string }
            thumbnail?: { url?: string }
        }
    }
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    blocked: boolean;
    confirmed: boolean;
    provider: string
    createdAt: Date
    updatedAt: Date
}

export enum ProductType {
    Normal = "NORMAL",
    Featured = "FEATURED",
    Trending = "TRENDING"
}