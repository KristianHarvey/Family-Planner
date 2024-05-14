
export interface KassalappProduct {
    id: number;
    name: string;
    brand: string;
    vendor: string;
    ean?: string;
    url?: string;
    image?: string;
    description?: string;
    ingredients?: string;
    currentPrice: number;
    currentUnitPrice?: number;
    weight?: number;
    weightUnit?: string;
    store?: Store;
    priceHistory?: PriceHistory[];
    allergens?: Allergens[];
    nutrition?: Nutrition[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface PriceHistory {
    price?: number;
    date?: Date;
}
interface Store {
    name?: string;
    code?: string;
    url?: string;
    logo?: string;
}

interface Allergens {
    code?: string;
    displayName?: string;
    contains?: string;
}

interface Nutrition {
    code?: string;
    displayName?: string;
    amount?: number;
    unit?: string;
}