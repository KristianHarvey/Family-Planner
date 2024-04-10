
export interface APIResponse {
    data?: any;
    token?: string;
    message?: string;
    isError?: boolean;
    statusCode?: number;
}