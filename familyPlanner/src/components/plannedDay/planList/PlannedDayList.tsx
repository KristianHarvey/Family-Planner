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

    return (
        <View style={{ display: 'flex', justifyContent: 'center', marginTop: Padding.Small }}>
            {plannedDay ? (
                <PlanListCard plannedDay={plannedDay} currentDate={currentDate}/>

            ) : (
                <View
                style={{

                }}>
                    <Text
                    style={{
                        color: colors.text_main,
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Medium
                    }}>
                        Ingen planer for i dag.
                    </Text>
                </View>

            )}
        </View>
    )
}