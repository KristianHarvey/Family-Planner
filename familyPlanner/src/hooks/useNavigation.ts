import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react"


export const useNavigate = () => {
    const navigate = useNavigation<NativeStackNavigationProp<any>>();

    return navigate;
}