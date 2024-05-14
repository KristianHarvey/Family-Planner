import { PlannedDay } from "./plannedDay";
import { User } from "./user";
import { WeeklyPlanner } from "./weeklyPlanner";

export interface Family {
    id: number;
    name: string;
    userUid?: string;
    familyColor?: string;
    members?: User[];
    plannedDays?: PlannedDay[];
}

export interface FamilyInput {
    name: string;
    members?: User[];
    plannedDays?: PlannedDay[];
}