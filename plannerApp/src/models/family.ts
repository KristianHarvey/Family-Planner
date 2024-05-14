import { PlannedDay } from "./plannedDay";
import { User } from "./user";
import { WeeklyPlanner } from "./weeklyPlanner";

export interface Family {
    id: number;
    name: string;
    userUid: string;
    members: User[];
    weeklyPlans: WeeklyPlanner[];
}

export interface FamilyInput {
    name: string;
    members?: User[];
    plannedDays?: PlannedDay[];
}