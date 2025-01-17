import { Plan } from "./plannedDay";

export interface WeeklyPlanner {
    id: number;
    familyId?: number;
    plans: Plan[];
};

export interface WeeklyPlannerInput {
    familyId?: number;
    plans: Plan[];
};