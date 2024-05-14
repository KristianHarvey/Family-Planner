import { User } from "./user";

export interface Activity {
    id: number;
    startDate: Date;
    endDate: Date;
    name: string;
    description: string;
    userUid?: string;
    users?: User[]
    planId?: number;
};

export interface ActivityInput {
    startDate: Date;
    endDate: Date;
    name: string;
    description?: string;
    userUid?: string;
    users?: User[]
    planId?: number;
}

export interface ActivityUpdate {
    startDate: Date;
    endDate: Date;
    name: string;
    description?: string;
    userUid?: string;
    users?: User[]
    planId?: number;
}
