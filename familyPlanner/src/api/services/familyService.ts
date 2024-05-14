import { axiosInstance, baseUrl } from "../../constants/apiConstants";
import { APIResponse } from "../../models/apiResponse";
import { Family, FamilyInput } from "../../models/family";

export class FamilyService {
    public static async createNew(family: FamilyInput) {
        const url = baseUrl + "Family";
        console.log("CREATE FAMILY REQUEST!!!!!!!!!!!");
        try {
            const response = await axiosInstance.post(url, family);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response", error);
            throw error;
        }
    };

    public static async getById(id: number) {
        const url = baseUrl + `Family/${id}`;
        console.log(id);
        try {
            const response = await axiosInstance.get(url);
            console.log(response.data);
            return response.data as APIResponse;
        } catch(error) {
            console.log("Error handling getting all families response ", error);
        }
    }

    public static async getAll() {
        const url = `${baseUrl}Family`;
        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.log("Error handling getting all families response ", error);
        }
    }

    public static async update(id: number, family: Family) {
        const url = `${baseUrl}Family/${id}`;
        console.log(family);
        console.log(url);
        try {
            const response = await axiosInstance.put(url, family);
            return response.data as APIResponse;
        } catch(error) {
            console.log("Error updating family ", error);
        }
    }

}