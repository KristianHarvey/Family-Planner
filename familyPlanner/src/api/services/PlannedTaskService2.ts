import { PlannedTask, PlannedTaskInput, PlannedTaskUpdate } from "../../models/plannedTask";
import { PlannedTaskManager } from "../managers/PlannedTaskManager";

export class PlannedTaskService2 {
    public static async createNewPlannedTask(plannedTask: PlannedTaskInput) {
        const response = await PlannedTaskManager.createNew(plannedTask);
        if(!response) {
            return null;
        }
        return response.data as PlannedTask;
    }
    public static async getPlannedTaskByid(id: number) {
        const response = await PlannedTaskManager.getPlannedTaskById(id);
        if(!response) {
            return null;
        }
        return response.data as PlannedTask;
    }
    public static async getAllPlannedTasks() {
        const response = await PlannedTaskManager.getPlannedTasksForCurrentUser();
        if(!response) {
            return null;
        }
        return  response.data as PlannedTask[];
    }
    public static async getPlannedTasksForPlannedDay(plannedDayId: number) {
        const response = await PlannedTaskManager.getPlannedTasksForPlannedDay(plannedDayId);
        if(!response) {
            return null;
        }
        return response.data as PlannedTask[];
    }
    public static async updatePlannedTask(id: number, plannedTask: PlannedTaskUpdate) {
        const response = await PlannedTaskManager.updatePlannedTask(id, plannedTask);
        if(!response) {
            return null;
        }
        return response.data as PlannedTask;
    }
}