import { User } from "./user";

export interface Image {
    id?: number;
    url?: string;
    uri?: string;
    userUid?: string;
    user?: User;
    createdAt?: Date;
    fileType?: string;
}