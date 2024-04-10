import { Family } from "./family";

export interface User {
    id: number;
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    families: Family[];
    role: string;
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