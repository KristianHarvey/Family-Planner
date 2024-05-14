import { axiosInstance, baseUrl } from "../../constants/apiConstants";
import { APIResponse } from "../../models/apiResponse";
import { PlannedDayInput } from "../../models/plannedDay";

export class PlannedDayRequests {
    public static async createNewPlannedDay(dayKey: string, plan: PlannedDayInput) {
        const url = baseUrl + `PlannedDay/${dayKey}`;
        console.log(url);
        console.log(plan);
        try {
            const response = await axiosInstance.post(url, plan);
            console.log(response.data);
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

        try {
            const response = await axiosInstance.get(url);
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