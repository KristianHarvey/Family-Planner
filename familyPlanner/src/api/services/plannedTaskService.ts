import { axiosInstance, baseUrl } from "../../constants/apiConstants";
import { APIResponse } from "../../models/apiResponse";
import { PlannedTaskInput } from "../../models/plannedTask";

export class PlannedTaskService {
    public static async createNewPlannedTask(plannedTask: PlannedTaskInput )  {
        const url = baseUrl + `PlannedTask`;

        try {
            const response = await axiosInstance.post(url, plannedTask);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }

    public static async getPlannedTasksForPlannedDay(plannedDayId: number)  {
        const url = baseUrl + `PlannedTask/${plannedDayId}`;

        try {
            const response = await axiosInstance.get(url, { params: plannedDayId });
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }
    public static async getPlannedTasksForCurrentUser(limit?: number, page?: number) {
        const url = baseUrl + `PlannedTask/user?${limit}&page=${page}`;

        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }

    public static async getAllPlannedTasksStored() {
        const url = baseUrl + `PlannedTask`;

        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }
    public static async getPlannedTaskById(id: number) {
        const url = baseUrl + `PlannedTask/${id}`;

        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }
    public static async deletePlannedTaskByid(id: number) {
        const url = baseUrl + `PlannedTask/${id}`;

        try {
            const response = await axiosInstance.delete(url, { params: id });
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }
}