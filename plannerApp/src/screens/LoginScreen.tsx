import React, { useRef, useState } from "react"
import { UserInput } from "../models/user"
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Padding } from "../constants/UIConstants";
import { useColor } from "../hooks/useColor";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthService } from "../api/authService";
import { useAuth } from "../hooks/useAuth";

export const LoginScreen = () => {
    const { colors } = useColor();
    const auth = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async() => {
        console.log("Submit!");
        try {
            await auth?.login({email, password});
            auth?.updateCredentials();
            if(auth?.isAuthenticated) {
                console.log("I am now authenticated, i should navigate");
                navigation.navigate("Home");
            }
        } catch(error) {
            console.error("failed to login", error);
        }
    }
    const handleRegisterNavigation = () => {
        navigation.navigate("Register");
    }
    return (
        <View>
            <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ borderWidth: 1, padding: Padding.Medium, margin: Padding.Medium}}
            />
            <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={{ borderWidth: 1, padding: Padding.Medium, margin: Padding.Medium}}
            />
            <TouchableOpacity onPress={handleSubmit}
            style={{ backgroundColor: colors.background.secondary, padding: 40}}>
                <Text>Login</Text>
            </TouchableOpacity>
            <Text>Dont have an account?</Text>
            <TouchableOpacity onPress={handleRegisterNavigation}>
                <Text style={{color: colors.text.secondary}}>Create an account here!</Text>
                </TouchableOpacity>
        </View>
    )
}