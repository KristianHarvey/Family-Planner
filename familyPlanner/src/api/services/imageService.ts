import { axiosInstance, baseUrl } from "../../constants/apiConstants";
import { APIResponse } from "../../models/apiResponse";
import { Image } from "../../models/image";
import FormData from 'form-data';

export class ImageService {
    // public static async UploadImage(image: FormData) {
    //     const url = baseUrl + 'Image';
    //     // console.log(url);
    //     console.log("Image in upload image: ", image);
    //     try {
    //         const response = await axiosInstance.post(url, image);
    //         console.log(response.data);
    //         return response.data as APIResponse;
    //     } catch(error) {
    //         console.error("Error handling response", error);
    //         throw error;
    //     }
    // }

    public static async UploadImage(image: FormData) {
        const url = baseUrl + 'Image';
        // console.log(url);
        console.log("Image in upload image: ", image);
        try {
            const response = await axiosInstance.post(url, image);
            console.log(response);
            return response;
        } catch(error) {
            console.error("Error handling response", error);
            throw error;
        }
    }
}