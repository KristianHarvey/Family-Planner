import axios from "axios";
import { User, UserInput } from "../../models/user";
import { axiosInstance, baseUrl } from "../../constants/apiConstants";
import { APIResponse } from "../../models/apiResponse";
import { Invite } from "../../models/invite";
import { useAuth } from "../../hooks/useAuth";

export class UserService {
    public static async createUser(user: UserInput) {
        const url = baseUrl + "User";
        console.log(url);
        try {
            const response = await axiosInstance.post(url, user);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response", error);
            throw error;
        }
    };

    public static async getByEmail(email: string) {
        const url = baseUrl + `User/emails/${email}`;
        console.log(email);
        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error fetching user by email", error);
            throw error;
        }
    }

    public static async getById(id: number) {
        const url = baseUrl + `User`;
        try {
            const response = await axiosInstance.get(url, { params: id });
            return response.data as Promise<APIResponse>;
        } catch(error) {
            console.error("Error fetching user: ", error);
            throw error;
        }
    }

    public static async getByUid(uid: string) {
        const url = baseUrl + `User/secrets/${uid}`;
        console.log(url);
        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error fetching user: ", error);
            throw error;
        }
    }

    public static async getAllInvites() {
        const url = baseUrl + `User/invites`;
        console.log(url);
        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error fetching invites: ", error);
            throw error;
        }
    }

    public static async acceptInvite(invite: Invite) {
        const url = baseUrl + `User/accept-invite`;
        console.log(url);
        try {
            const response = await axiosInstance.put(url, invite);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error sending accept invite: ", error);
            throw error;
        }
    }

    public static async declineInvite(invite: Invite) {
        const url = baseUrl + `User/decline-invite`;
        console.log(url);
        try {
            const response = await axiosInstance.put(url, invite);
            console.log(response.data);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error fetching user: ", error);
            throw error;
        }
    }

    public static async getAllUsers() {
        const url = baseUrl + `User`;
        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error fetching user: ", error);
            throw error;
        }
    }
    
    public static async SendInviteToUser(invite: Invite) {
        const url = baseUrl + 'User/send-invite';
        console.log(url);
        console.log("INVITE: ", invite);
        try {
            const response = await axiosInstance.post(url, invite);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error sending invite: ", error);
        }
    }
}

export const getUserById = async(id: number) => {
    const url = baseUrl + "User";
    try {
        const response = await axios.get(url, { params: id });
        return response.data as Promise<APIResponse>;
    } catch(error) {
        console.error("Error fetching user: ", error);
        throw error;
    }
}