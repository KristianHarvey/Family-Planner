import axios from "axios";
import { UserInput } from "../models/user";
import { axiosInstance, baseUrl } from "../constants/apiConstants";
import { APIResponse } from "../models/apiResponse";

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

    public static async getById(id: number) {
        const url = baseUrl + `User`;
        try {
            const response = await axios.get(url, { params: id });
            return response.data as Promise<APIResponse>;
        } catch(error) {
            console.error("Error fetching user: ", error);
            throw error;
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