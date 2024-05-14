import React, { useEffect } from "react";
import { Credentials, User } from "../models/user";
import { AuthService } from "../api/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TokenInfo } from "../models/tokenInfo";
import { UserService } from "../api/services/userService";

export interface AuthContextData {
    user?: User | null;
    token?: string | null;
    userUid?: string | null;
    isAuthenticated?: boolean;
    login: (data: Credentials) => Promise<void>;
    logout: () => void;
    updateCredentials: () => void;
    role: string | null;
}

export const AuthContext = React.createContext<AuthContextData | undefined>(undefined);

interface AuthContextProviderProps extends React.PropsWithChildren {

}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({children}) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [userUid, setUserUid] = React.useState<string | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [role, setRole] = React.useState<string | null>(null);
    const [expires, setExpires] = React.useState<Date | undefined>();

    const login = async(data: Credentials) => {
        console.log("Hit login!");
        try {
            const response = await AuthService.login(data);
            if(response) {
                setUser(response.data);
                setUserUid(response.data.uid);
                setToken(response.accessToken!);
                setIsAuthenticated(true);
                if(response.accessToken) {
                    await AsyncStorage.setItem("AccessToken", response.accessToken!);
                }
                if(response.refreshToken) {
                    await AsyncStorage.setItem("RefreshToken", response.refreshToken!);
                }
            } else {
                setIsAuthenticated(false);
            }
        } catch(error) {
            setIsAuthenticated(false);
            console.error("Failed to login!: ", error);
        }
    }
    const logout = async() => {
        try {
            await AuthService.logout();
            setIsAuthenticated(false);
            AsyncStorage.removeItem("Token");
        } catch(error) {
            console.error("Failed to log out: ", error);
            throw error;
        }
    }
    

    const updateCredentials = async() => {
        console.log("Refrsh token: ", await AsyncStorage.getItem('RefreshToken'));
        try {
            const response = await AuthService.getTokenInfo();
            if(response) {
                const responseToken = response.data;
                const tokenInfo: TokenInfo = {
                    userUid: responseToken.uid,
                    role: responseToken.role,
                    expiryDate: new Date(responseToken.expiryDate)
                };

                const userResponse = await UserService.getByUid(tokenInfo.userUid!);
                setUser(userResponse.data);
                setUserUid(tokenInfo.userUid!);
                setExpires(tokenInfo.expiryDate);
                setRole(tokenInfo.role!);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                throw new Error('Failed to update credentials: ');
            }

        } catch(error) {
            console.error("Failed to update credentials: ", error);

            // If updating credentials fails, attempt to refresh the token
            try {
                const refreshResponse = await AuthService.refreshToken();
                if (refreshResponse) {
                    await AsyncStorage.setItem('AccessToken', refreshResponse.accessToken!);
                    await AsyncStorage.setItem('RefreshToken', refreshResponse.refreshToken!);

                    // Retry updating credentials
                    await updateCredentials();
                } else {
                    setIsAuthenticated(false);
                }
            } catch (refreshError) {
                console.error("Failed to refresh token: ", refreshError);
                setIsAuthenticated(false);
                // Handle the failure to refresh token (e.g., display an error message)
            }
        }
    }

    useEffect(() => {
        if (!expires) {
            return;
        }
        let timeUntilExpires = expires ? expires.getTime() - Date.now() : 1000;
        const timer = setTimeout(async() => {
            const response = await AuthService.refreshToken();
            console.log("Response when refreshing token: ", response.data);
            if(response) {
                await AsyncStorage.setItem("AccessToken", response.accessToken!);
                await AsyncStorage.setItem("RefreshToken", response.refreshToken!);
            }
            updateCredentials();
        }, timeUntilExpires)
        return () => {
            clearTimeout(timer);
        }
    }, [expires]);

    useEffect(() => {
        updateCredentials();
    }, []);


    return (
        <AuthContext.Provider
        value={{
            isAuthenticated,
            user,
            userUid,
            token,
            login,
            logout,
            updateCredentials,
            role
        }}>
            {children}
        </AuthContext.Provider>
    )
}