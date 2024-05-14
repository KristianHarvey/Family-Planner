
export interface APIResponse {
    data?: any;
    accessToken?: string;
    refreshToken?: string;
    message?: string;
    isError?: boolean;
    statusCode?: number;
}