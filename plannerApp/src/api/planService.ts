import axios from "axios";
import { axiosInstance, baseUrl } from "../constants/apiConstants";
import { PlanInput } from "../models/plan";
import { APIResponse } from "../models/apiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class PlanService {
    public static async createNewPlanAt(dayKey: string, plan: PlanInput) {
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
    };

    public static async getAllByDayKey(dayKey: string)  {
        const url = baseUrl + `Plan/${dayKey}`;

        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response: ", error);
            throw error;
        }
    }
}