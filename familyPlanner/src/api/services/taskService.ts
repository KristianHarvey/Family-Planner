import { axiosInstance, baseUrl } from "../../constants/apiConstants";
import { APIResponse } from "../../models/apiResponse";
import { TaskItemInput } from "../../models/task";

export class TaskService {
    public static async CreateForPlan(planId: number, newTask: TaskItemInput) {
        const url = baseUrl + `Plan/${dayKey}`;
        console.log(url);
        console.log(plan);
        try {
            const response = await axiosInstance.post(url, plan);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response", error);
            throw error;
        }
    }
}