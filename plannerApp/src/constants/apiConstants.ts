import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";

export const baseUrl = "http://10.0.2.2:5001/api/"

const createAxiosInstance = (): AxiosInstance => {
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        timeout: 5000, // Set a default timeout
        headers: {
            'Content-Type': 'application/json', // Set default headers
        },
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            const token = await AsyncStorage.getItem('Token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


    // Add interceptors, such as request and response interceptors, if needed

    return axiosInstance;
};

// Export a singleton instance of Axios with base configuration
export const axiosInstance = createAxiosInstance();