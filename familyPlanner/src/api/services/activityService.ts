import { axiosInstance, baseUrl } from "../../constants/apiConstants";
import { Activity } from "../../models/activity";
import { APIResponse } from "../../models/apiResponse";

export class ActivityService {
    public static async create(activity: Activity)  {
        const url = baseUrl + `Activity`;

        try {
            const response = await axiosInstance.post(url, activity);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }

    public static async getAllForCurrentUser() {
        const url = baseUrl + `Activity`;

        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }
}