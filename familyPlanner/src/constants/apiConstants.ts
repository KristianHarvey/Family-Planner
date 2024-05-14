import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { AuthService } from "../api/services/authService";
import { Platform } from "react-native";

export const baseUrl = "https://cde9-129-242-242-55.ngrok-free.app/api/"

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
            const accessToken = await AsyncStorage.getItem('AccessToken');
            const refreshToken = await AsyncStorage.getItem('RefreshToken');
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            if (refreshToken) {
                config.headers['RefreshToken'] = refreshToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.request.use(
        (config) => {
            // Check if FormData is used in the request body
            if (config.data instanceof FormData) {
                // Set content type to multipart/form-data for FormData requests
                config.headers['Content-Type'] = 'multipart/form-data';
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

export const kassalAppApiKey = "p9EoXAHI3NleLZkuyhJbofonGQeNx7C9bOTeBwPw";