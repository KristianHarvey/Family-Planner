import { Family } from "./family";
import { User } from "./user";

export interface Invite {
    id?: number;
    fromUserUid: string;
    fromUser?: User;
    toUserUid: string;
    toUser?: User;
    status?: string;
    toFamilyId: number;
    family?: Family;
}

export const inviteStatus = {
    Pending: "Pending",
    Received: "Received",
    Accepted: "Accepted",
    Declined: "Declined",
}