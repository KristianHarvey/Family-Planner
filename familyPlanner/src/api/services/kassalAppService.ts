import axios from "axios";
import { kassalAppApiKey } from "../../constants/apiConstants";
import { KassalappProduct } from "../../models/kassalappModel";

export class KassalappService {

    public static async getFirst100Products() {
        const requestSize = 100;
        const url = `https://kassal.app/api/v1/products?size=${requestSize}`;
        
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${kassalAppApiKey}`
                }
            });
            return response.data;
        } catch(error) {
            console.error("Failed to search for item: ", error);
        }
    }

    public static async searchProduct(query: string) {
        console.log(query);
        const url = `https://kassal.app/api/v1/products?search=${query}`;
        
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${kassalAppApiKey}`
                }
            });
            if (response.status === 200) {
                let products: KassalappProduct[] = [];
        
                // If response data is an object with a 'data' property containing an array, extract that array
                if (response.data && Array.isArray(response.data.data)) {
                    products = response.data.data;
                } else {
                    console.error("Response data format is not as expected");
                    return null;
                }
                return products;
            }
        } catch(error) {
            console.error("Failed to search for item: ", error);
        }
    }
}