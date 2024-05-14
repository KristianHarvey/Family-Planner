import { axiosInstance, baseUrl } from "../../constants/apiConstants";
import { APIResponse } from "../../models/apiResponse";

export class ImageService {
    public static async UploadImage(file: File | Blob) {
        const url = baseUrl + 'Image';
        const formData = new FormData()
        formData.append('image', file);
        try {
            const response = await axiosInstance.post(url, formData);
            return response.data as APIResponse;
        } catch(error) {
            console.error("Error handling response", error);
            throw error;
        }
    }
}