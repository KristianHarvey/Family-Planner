import { Activity, ActivityInput } from "./activity";
import { Family } from "./family";
import { Meal, MealInput } from "./meal";
import { PlannedDay } from "./plannedDay";
import { ShoppingList, ShoppingListInput } from "./shoppingList";
import { TaskItem, TaskItemInput } from "./task";
import { User } from "./user";

export interface PlannedTask {
	id?: number;
	name: string;
	description?: string;
	status?: string;
	assignedTo?: User;
	startDate: Date;
	endDate: Date;
	type?: string;
	plannedDayId?: number;
	PlannedDay?: PlannedDay;
	familyId?: number;
	family?: Family;
	completed?: boolean;
}

export interface PlannedTaskInput {
	name: string;
	description?: string;
	status?: string;
	assignedTo?: User;
	startDate: Date;
	endDate: Date;
	type?: string;
	plannedDayId?: number;
	familyId?: number;
}

export interface PlannedTaskUpdate {
	name: string;
	description?: string;
	status?: string;
	assignedTo?: User;
	startDate: Date;
	endDate: Date;
	type?: string;
}
