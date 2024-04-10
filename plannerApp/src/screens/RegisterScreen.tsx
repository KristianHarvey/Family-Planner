import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Padding } from "../constants/UIConstants";
import { useColor } from "../hooks/useColor";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { User, UserInput } from "../models/user";
import { UserService } from "../api/userService";

export const RegisterScreen = () => {
    const { colors } = useColor();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [firstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async() => {
        try {
            const user: UserInput = {
                firstName: firstName,
                lastName: LastName,
                email: email,
                password: password,
            };
            console.log(user);
            const response = await UserService.createUser(user);
            console.log(response);
        } catch(error) {
            console.error("Failed creating user", error);
            throw error;
        }
        navigation.navigate("Login");
    };
    return (
        <View>
            <TextInput
            placeholder="Fornavn"
            value={firstName}
            onChangeText={setFirstName}
            style={{ borderWidth: 1, padding: Padding.Medium, margin: Padding.Medium}}
            />
            <TextInput
            placeholder="Etternavn"
            value={LastName}
            onChangeText={setLastName}
            style={{ borderWidth: 1, padding: Padding.Medium, margin: Padding.Medium}}
            />
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
            <Text>Registrer</Text>
        </TouchableOpacity>
        </View>
  );
};