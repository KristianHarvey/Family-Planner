import React, { useRef, useState } from "react"
import { UserInput } from "../models/user"
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Font, FontSize, Padding } from "../constants/UIConstants";
import { useColor } from "../hooks/useColor";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthService } from "../api/services/authService";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/button/Button";
import { TopBar } from "../components/common/topBar/TopBar";

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
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background.main,
        }}
        >
            <TopBar 
            leftText="avbryt" 
            leftTextColor={colors.accent.main}
            cameFromScreen="Startup" />
            <View 
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <View style={{
                    width: '90%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOpacity: 0.8,
                    shadowRadius: 5,
                    shadowOffset: {width: 0, height: 1},
                    elevation: 3,

                }}>
                    <TextInput
                    style={{ 
                        width: '100%',
                        backgroundColor: colors.textCard.main,
                        color: colors.text.main,
                        borderBottomWidth: 1,
                        borderTopLeftRadius: Padding.Small,
                        borderTopRightRadius: Padding.Small,
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Small,
                        padding: Padding.Large,
                    }}
                    placeholderTextColor={colors.textCard.secondary}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    />
                    <TextInput
                    style={{ 
                        width: '100%', 
                        backgroundColor: colors.textCard.main,
                        color: colors.text.main,
                        borderBottomLeftRadius: Padding.Small,
                        borderBottomRightRadius: Padding.Small,
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Small,
                        padding: Padding.Large,
                    }}
                    placeholderTextColor={colors.textCard.secondary}
                    placeholder="Passord"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity 
                onPress={handleSubmit}
                style={{ 
                    marginTop: Padding.XLarge,
                    width: '90%',
                    borderRadius: Padding.Small,
                    backgroundColor: colors.text.secondary, 
                    padding: Padding.Large}}>
                    <Text style={{
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Small,
                        color: colors.text.main,
                        textAlign: 'center'
                    }}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}