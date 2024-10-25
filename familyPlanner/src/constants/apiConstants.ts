import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { AuthService } from "../api/services/authService";
import { Platform } from "react-native";
import { SERVEOURL } from "./constants";

// http://localhost:5001
export const baseUrl = `https://4de21445b9c507297673824ece1ba91f.serveo.net/api/`;
console.log(baseUrl);

const createAxiosInstance = (): AxiosInstance => {
	const axiosInstance = axios.create({
		baseURL: baseUrl,
		timeout: 10000, // Set a default timeout
		headers: {
			"Content-Type": "application/json", // Set default headers
		},
	});

	axiosInstance.interceptors.request.use(
		async (config) => {
			const accessToken = await AsyncStorage.getItem("AccessToken");
			const refreshToken = await AsyncStorage.getItem("RefreshToken");
			if (accessToken) {
				config.headers["Authorization"] = `Bearer ${accessToken}`;
			}
			if (refreshToken) {
				config.headers["RefreshToken"] = refreshToken;
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
				config.headers["Content-Type"] = "multipart/form-data";
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
