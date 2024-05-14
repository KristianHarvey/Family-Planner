import { PlannedDay, PlannedDayInput, PlannedDayUpdate } from "../../models/plannedDay";
import { PlannedDayManager } from "../managers/PlannedDayManager";

export class PlannedDayService2 {
    public static async createNewPlannedDay(dayKey: string, plannedDay: PlannedDayInput) {
        const response = await PlannedDayManager.createNew(dayKey, plannedDay);
        if(!response) {
            return null;
        }
        return response.data as PlannedDay;
    }
    public static async getPlannedDay(dayKey: string) {
        const response = await PlannedDayManager.getPlannedDayForCurrentUser(dayKey);
        if(!response) {
            return null;
        }
        return response.data as PlannedDay;
    }
    public static async getAllPlannedDays() {
        const response = await PlannedDayManager.getAllPlannedDaysForCurrentUser();
        if(!response) {
            return null;
        }
        return  response.data as PlannedDay[];
    }
    public static async getPlannedDayById(id: number) {
        const response = await PlannedDayManager.getPlannedDayById(id);
        if(!response) {
            return null;
        }
        return response.data as PlannedDay;
    }
    public static async updatePlannedDay(id: number, plannedDay: PlannedDayUpdate) {
        const response = await PlannedDayManager.updatePlannedDay(id, plannedDay);
        if(!response) {
            return null;
        }
        return response.data as PlannedDay;
    }
    public static async deletePlannedDay(id: number) {
        const response = await PlannedDayManager.deleteById(id);
        if(!response) {
            return null;
        }
        return response.data as boolean;
    }
}