import { Family } from "./family";
import { KassalappProduct } from "./kassalappModel";
import { PlannedDay } from "./plannedDay";

export interface ShoppingList {
	id?: number;
	name: string;
	items?: ShoppingListItem[];
	familyId?: number;
	family?: Family;
	userUid?: string;
	dayKey?: string;
	startDate?: Date;
	endDate?: Date;
	plannedDayId?: number;
	plannedDay?: PlannedDay;
	completed?: boolean;
}

export interface ShoppingListItem {
	id?: number;
	name: string;
	quantity?: number;
	brand: string;
	ean?: string;
	url?: string;
	image?: string;
	description?: string;
	ingredients?: string;
	currentPrice: number;
	currentUnitPrice?: number;
	priceHistory?: PriceHistory[];
	allergens?: Allergens[];
	nutrition?: Nutrition[];
	createdAt?: Date;
	updatedAt?: Date;
	shoppingListId?: number;
	shoppingList?: ShoppingList;
}

interface PriceHistory {
	price?: number;
	date?: Date;
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

export interface ShoppingListInput {}
