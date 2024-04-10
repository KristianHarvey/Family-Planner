import { User } from "./user";
import { WeeklyPlanner } from "./weeklyPlanner";

export interface Family {
    id: number;
    name: string;
    creatorId: number;
    users: User[];
    weeklyPlans: WeeklyPlanner[];
}