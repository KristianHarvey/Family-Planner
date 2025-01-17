import axios from "axios";
import { axiosInstance, baseUrl } from "../../constants/apiConstants";
import { PlannedDay, PlannedDayInput, PlannedDayUpdate } from "../../models/plannedDay";
import { APIResponse } from "../../models/apiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShoppingList } from "../../models/shoppingList";


export class PlannedDayService {
    public static async createUpdatePlannedDay(dayKey: string, plan: PlannedDay) {
        const url = baseUrl + `PlannedDay/${dayKey}`;
        console.log(url);
        console.log(plan);
        try {
            const response = await axiosInstance.post(url, plan);
            return response.data as APIResponse;
        } catch(error: any) {
            // console.error("Error handling response", error);
            // throw error;
            console.log("Catch error: ", error);
            if (error.response) {
                // The request was made and the server responded with a non-2xx status code
                console.error("Error response status:", error.response.status);
                console.error("Error response data:", error.response.data);
                console.error("Error response headers:", error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error("Error setting up request:", error.message);
            }
            console.error("Error handling response", error);
            throw error;
        }
    };

    public static async getPlannedDayForCurrentUser(dayKey: string)  {
        const url = baseUrl + `PlannedDay/dates/${dayKey}`;
        console.log(url);
        try {
            const response = await axiosInstance.get(url);
            console.log(response.data);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }

    public static async createUpdateShoppingList(dayKey: string, shoppingList: ShoppingList)  {
        const url = baseUrl + `PlannedDay/${dayKey}/shoppinglists`;
        console.log(url);
        try {
            const response = await axiosInstance.post(url, shoppingList);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }

    public static async getAllPlannedDaysForCurrentUser() {
        const url = baseUrl + `PlannedDay/user`;

        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }

    public static async getAllPlannedDays() {
        const url = baseUrl + `PlannedDay`;

        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }

    public static async getPlannedDayById(id: number) {
        const url = baseUrl + `PlannedDay/${id}`;
        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }

    public static async updatePlannedDay(id: number, plannedDay: PlannedDayUpdate) {
        const url = baseUrl + `PlannedDay/${id}`;
        try {
            const response = await axiosInstance.put(url, plannedDay);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }

    public static async deleteById(id: number) {
        const url = baseUrl + `PlannedDay/${id}`;
        try {
            const response = await axiosInstance.delete(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }
}