import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColor } from "../../../hooks/useColor";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlanListCard } from "../planListCard/PlanListCard";
import { PlannedTask } from "../../../models/plannedTask";
import { PlannedDay } from "../../../models/plannedDay";
import { PlannedDayController } from "../../../api/controllers/PlannedDayController";

interface PlanListProps {
    plannedDay?: PlannedDay;
    currentDate: string;
}

export const PlanList: React.FC<PlanListProps> = ({plannedDay, currentDate}) => {
    const { colors } = useColor();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const handleClick = (planId: number) => {
        navigation.navigate("Plan", {planId});
    }

    useEffect(() => {
        console.log(plannedDay);
    }, []);

    return (
        <View style={{ display: 'flex', justifyContent: 'center', marginTop: Padding.Small }}>
            {!plannedDay ? (
                <View style={{ alignItems: "center" }}>
                    <Text style={{
                        fontFamily: Font.TitilliumWebRegular,
                        color: colors.text.main,
                        fontSize: FontSize.Small
                    }}>Du har ingen planer planlagt for denne dagen</Text>
                </View>
            ): (
                <View>
                    <View style={{borderBottomWidth: 2, justifyContent: "center", alignItems: "center"}}>
                        <Text 
                        style={{
                            color: colors.text.main,
                            fontSize: FontSize.Medium, 
                            marginBottom: Padding.Medium,
                            fontFamily: Font.TitilliumWebRegular}}
                        >Hele dagen</Text>
                    </View>
                    <View style={{borderBottomWidth: 2, justifyContent: "center", alignItems: "center"}}>
                        <Text 
                        style={{
                            color: colors.text.main,
                            fontSize: FontSize.Medium, 
                            marginBottom: Padding.Medium,
                            fontFamily: Font.TitilliumWebRegular}}
                        >Morgen</Text>
                    </View>
                    <View style={{borderBottomWidth: 2, justifyContent: "center", alignItems: "center"}}>
                        <Text 
                        style={{
                            color: colors.text.main,
                            fontSize: FontSize.Medium, 
                            marginBottom: Padding.Medium,
                            fontFamily: Font.TitilliumWebRegular}}
                        >Formiddag</Text>
                    </View>
                    <View style={{borderBottomWidth: 2, justifyContent: "center", alignItems: "center"}}>
                        <Text 
                        style={{
                            color: colors.text.main,
                            fontSize: FontSize.Medium, 
                            marginBottom: Padding.Medium,
                            fontFamily: Font.TitilliumWebRegular}}
                        >Ettermiddag</Text>
                    </View>
                    <View style={{borderBottomWidth: 2, justifyContent: "center", alignItems: "center"}}>
                        <Text 
                        style={{
                            color: colors.text.main,
                            fontSize: FontSize.Medium, 
                            marginBottom: Padding.Medium,
                            fontFamily: Font.TitilliumWebRegular}}
                        >Kveld</Text>
                    </View>
                    <View>
                        <PlanListCard plannedDay={plannedDay} currentDate={currentDate}/>
                    </View>
                </View>
            )}
        </View>
    )
}