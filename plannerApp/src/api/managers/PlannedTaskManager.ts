import { axiosInstance, baseUrl } from "../../constants/apiConstants";
import { APIResponse } from "../../models/apiResponse";
import { PlannedTaskInput, PlannedTaskUpdate } from "../../models/plannedTask";


export class PlannedTaskManager {
    public static async createNew(plannedTask: PlannedTaskInput )  {
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
    public static async getPlannedTasksForCurrentUser() {
        const url = baseUrl + `PlannedTask/user`;

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
    public static async updatePlannedTask(id: number, plannedTask: PlannedTaskUpdate) {
        const url = baseUrl + `PlannedTask/${id}`;
        
        try {
            const response = await axiosInstance.put(url, plannedTask);
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