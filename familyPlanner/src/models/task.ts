import { User } from "./user";

export interface TaskItem {
    id: number;
    name: string;
    description: string;
    status: string;
    createdByUserUid?: string;
    startDate: Date;
    endDate: Date;
    planId?: number;
    assignedUser?: User;
}

export interface TaskItemInput {
    name: string;
    description?: string;
    status?: string;
    createdByUserUid?: string;
    startDate: Date;
    endDate: Date;
    planId?: number;
    assignedUser?: User;
}