import { axiosInstance, baseUrl } from "../../constants/apiConstants";
import { APIResponse } from "../../models/apiResponse";
import { ShoppingList } from "../../models/shoppingList";

export class ShoppingListService {
    public static async create(shoppingList: ShoppingList) {
        const url = baseUrl + "ShoppingList";
        console.log(url);
        try {
            const response = await axiosInstance.post(url, shoppingList);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Failed to create shopping list: ", error);
            throw error;
        }
    }

    public static async getById(id: number) {
        const url = baseUrl + `ShoppingList/${id}`;
        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Failed to fetch shopping list: ", error);
            throw error;
        }
    }

    public static async update(id: number, shoppingList: ShoppingList) {
        const url = baseUrl + `ShoppingList/${id}`;
        try {
            const response = await axiosInstance.put(url, shoppingList);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Failed to create shopping list: ", error);
            throw error;
        }
    }

    public static async getAllForCurrentUser() {
        const url = baseUrl + "ShoppingList";
        console.log(url);
        try {
            const response = await axiosInstance.get(url);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Failed to create shopping list: ", error);
            throw error;
        }
    }
}