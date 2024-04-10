import { Activity } from "./activity";
import { Family } from "./family";
import { Meal } from "./meal";
import { ShoppingList } from "./shoppingList";
import { TaskItem } from "./task";
import { User } from "./user";
import { WeeklyPlanner } from "./weeklyPlanner";

export interface Plan {
    id: number;
    name: string;
    date: Date;
    tasks?: TaskItem[];
    activities?: Activity[];
    meals?: Meal[];
    shoppingLists?: ShoppingList[];
    users?: User[];
    family?: Family;
    weekDayKey?: string;
    weeklyPlannerId: number;
    weeklyPlanner: WeeklyPlanner;
}

export interface PlanInput {
    name: string;
    daykey: string;
    tasks?: TaskItem[];
    activities?: Activity[];
    meals?: Meal[];
    shoppingLists?: ShoppingList[];
    users?: User[];
    family?: Family;
    weekDayKey?: string;
    weeklyPlannerId?: number;
    weeklyPlanner?: WeeklyPlanner;
}