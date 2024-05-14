import axios from "axios";
import { axiosInstance, baseUrl } from "../../constants/apiConstants";
import { Credentials } from "../../models/user";
import { APIResponse } from "../../models/apiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AuthService {
    public static async login(credentials: Credentials) {
        const url = baseUrl + "Auth/login";
        try {
            const response = await axiosInstance.post(url, credentials);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Failed to login: ", error);
            throw error;
        }
    }
    
    public static async logout() {
        const url = baseUrl + "Auth/logout";
        try {
            const response = await axiosInstance.post(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Failed to log out: ", error);
            throw error;
        }
    };
    
    public static async getTokenInfo() {
        const url = baseUrl + `Auth/token-info`;
        const token = await AsyncStorage.getItem("Token");
        console.log(token);
        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Failed to fetch token info: ", error);
            throw error;
        }
    };

    public static async refreshToken() {
        const url = baseUrl + "Auth/refresh-token";
        try {
            const response = await axiosInstance.post(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Failed to refresh token: ", error);
            throw error;
        }
    };
}