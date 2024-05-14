import { Activity, ActivityInput } from "./activity";
import { Family } from "./family";
import { Meal, MealInput } from "./meal";
import { PlannedTask, PlannedTaskInput } from "./plannedTask";
import { ShoppingList, ShoppingListInput } from "./shoppingList";
import { TaskItem, TaskItemInput } from "./task";
import { User } from "./user";
import { WeeklyPlanner } from "./weeklyPlanner";

export interface PlannedDay {
    id?: number;
    dayKey?: string;
    plannedTasks?: PlannedTask[];
    shoppingLists?: ShoppingList[];
    activities?: Activity[];
    meals?: Meal[];
    userUid?: string;
    user?: User;
    familyId?: number;
    family?: Family;
}

export interface PlannedDayInput {
    plannedTasks?: PlannedTaskInput[];
    shoppingLists?: ShoppingListInput[];
    activities?: ActivityInput[];
    meals?: MealInput[];
    familyId?: number;
}

export interface PlannedDayDTO {
    plannedTasks?: PlannedTask[];
    shoppingLists?: ShoppingList[];
    activities?: Activity[];
    meals?: Meal[];
    familyId?: number;
}

export interface PlannedDayUpdate {
    plannedTasks?: PlannedTask[];
    shoppingLists?: ShoppingList[];
    activities?: Activity[];
    meals?: Meal[];
}