import { Family } from "./family";
import { Image } from "./image";
import { Invite } from "./invite";
import { PlannedDay } from "./plannedDay";

export interface User {
    id: number;
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    profileImage?: Image;
    selectedFamilyId?: number;
    selectedFamily?: Family;
    families?: Family[];
    plannedDays?: PlannedDay[];
    sentInvites?: Invite[];
    receivedInvites?: Invite[];
    role: string;
};

export interface UserUpdate {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    families: Family[];
};

export interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export interface Credentials {
    email: string;
    password: string;
}