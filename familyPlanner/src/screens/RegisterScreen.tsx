import { useState } from "react"
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Padding } from "../constants/UIConstants";
import { useColor } from "../hooks/useColor";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { User, UserInput } from "../models/user";
import { UserService } from "../api/services/userService";
import { TopBar } from "../components/common/topBar/TopBar";
import { useAuth } from "../hooks/useAuth";

export const RegisterScreen = () => {
    const { colors } = useColor();
    const auth = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [firstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async() => {
        try {
            const user: UserInput = {
                firstName: firstName,
                lastName: LastName,
                email: email,
                username: username,
                password: password,
            };
            console.log(user);
            const response = await UserService.createUser(user);
            if(response.statusCode == 200) {
                try {
                    auth.login({
                        email: email,
                        password: password
                    });
                } catch(error) {
                    console.error("Failed to login after register: ", error);
                }
            }
        } catch(error) {
            console.error("Failed creating user", error);
            throw error;
        }
        navigation.navigate("Login");
    };
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background.main}}>
            <TopBar 
            leftText="avbryt"
            leftTextColor={colors.accent.main}
            cameFromScreen="Startup"/>
            <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View
                style={{
                    width: '90%',

                }}>
                    <TextInput
                    placeholder="Fornavn"
                    value={firstName}
                    onChangeText={setFirstName}
                    style={{ borderWidth: 1, padding: Padding.Medium, margin: Padding.Medium, color: colors.text.main}}
                    placeholderTextColor={colors.textCard.secondary}
                    />
                    <TextInput
                    placeholder="Etternavn"
                    value={LastName}
                    onChangeText={setLastName}
                    style={{
                        borderWidth: 1, 
                        padding: Padding.Medium, 
                        margin: Padding.Medium,
                        color: colors.text.main
                    }}
                    placeholderTextColor={colors.textCard.secondary}
                    />
                    <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={{ borderWidth: 1, padding: Padding.Medium, margin: Padding.Medium, color: colors.text.main}}
                    placeholderTextColor={colors.textCard.secondary}
                    />
                    <TextInput
                    placeholder="Brukernavn"
                    value={username}
                    onChangeText={setUsername}
                    style={{ borderWidth: 1, padding: Padding.Medium, margin: Padding.Medium, color: colors.text.main}}
                    placeholderTextColor={colors.textCard.secondary}
                    />
                    <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={{ borderWidth: 1, padding: Padding.Medium, margin: Padding.Medium, color: colors.text.main}}
                    placeholderTextColor={colors.textCard.secondary}
                    />

                    <TouchableOpacity onPress={handleSubmit}
                    style={{ backgroundColor: colors.background.secondary, padding: 40}}>
                        <Text>Registrer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
  );
};