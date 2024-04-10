import axios from "axios";
import { baseUrl } from "../constants/apiConstants";
import { WeeklyPlannerInput } from "../models/weeklyPlanner";
import { APIResponse } from "../models/apiResponse";
import { PlanInput } from "../models/plan";

export class WeeklyPlannerService {
    public static async createNewWeeklyPlan(newWeeklyPlan: WeeklyPlannerInput) {
        const url = baseUrl + "WeeklyPlanner";
        console.log(url);
        try {
            const response = await axios.post(url, newWeeklyPlan);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response", error);
            throw error;
        }
    };

    public static async createNewPlanFor(weeklyPlannerId: number, weekDayKey: string, newPlan: PlanInput) {
        const url = baseUrl + `WeeklyPlanner/${weeklyPlannerId}/${weekDayKey}`;
        try {
            const response = await axios.post(url, newPlan);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response", error);
            throw error;
        }
    }
}