import React, { useEffect } from "react";
import { Credentials, User } from "../models/user";
import { AuthService } from "../api/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TokenInfo } from "../models/tokenInfo";

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
        try {
            const response = await AuthService.login(data);
            if(response) {
                setUser(response.data);
                setUserUid(response.data.uid);
                setToken(response.token!);
                setIsAuthenticated(true);
                await AsyncStorage.setItem("Token", response.token!);
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
        try {
            const response = await AuthService.getTokenInfo();
            if(response) {
                const responseToken = response.data;
                const tokenInfo: TokenInfo = {
                    userUid: responseToken.uid,
                    role: responseToken.role,
                    expiryDate: new Date(responseToken.expiryDate)
                };
                setUserUid(tokenInfo.userUid!);
                setExpires(tokenInfo.expiryDate);
                setRole(tokenInfo.role!);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }

        } catch(error) {
            setIsAuthenticated(false);
            console.error("Failed to update credentials!: ", error);
            throw error;
        }
    }

    useEffect(() => {
        if(!expires) {
            return;
        }
        // var currentDate = new Date();
        // currentDate.setMinutes(currentDate.getMinutes() + 2)
        const timeUntilExpires = expires.getTime() - Date.now();
        const timer = setTimeout(async() => {
            const response = await AuthService.refreshToken();
            console.log("Response when refreshing token: ", response);
            if(response) {
                await AsyncStorage.setItem("Token", response.data);
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