import { Text, TouchableOpacity, View } from "react-native";
import { CustomCard } from "../../customCard/CustomCard";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";
import { useColor } from "../../../hooks/useColor";
import React, { PropsWithChildren } from "react";
import Feather from 'react-native-vector-icons/Feather';
import { format } from "date-fns";
import SelectDropdown from "react-native-select-dropdown";
import { Button } from "../../button/Button";

interface CalendarCardProps extends PropsWithChildren {
    currentDate: Date;
    onMonthChange: (month: Date) => void;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({children, currentDate, onMonthChange}) => {
    const months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];
    const currentMonthIndex = currentDate.getMonth();
    const [month, setMonth] = React.useState(months[currentMonthIndex]);
    
    const handleSelect = (item: any, index: any) => {
        onMonthChange(new Date(currentDate.setMonth(index)));
        setMonth(item);
    }

    const { colors } = useColor();
    return (
        <View style={{ backgroundColor: colors.textCard.main, padding: Padding.Medium, margin: Padding.Large, borderRadius: Padding.Large}}>
                <View style={{ flexDirection: "row", padding: Padding.Large, }}>
                    <Text 
                    style={{ 
                        color: colors.text.main, 
                        fontFamily: Font.TitilliumWebRegular, 
                        fontSize: FontSize.Medium
                    }}>
                        Planer for
                    </Text>
                    <Text style={{
                        marginLeft: Padding.Small,
                        color: colors.text.secondary,
                        fontFamily: Font.TitilliumWebRegular, 
                        fontSize: FontSize.Medium 
                    }}>
                        {month}
                    </Text>
                    <SelectDropdown data={months} 
                    onSelect={(selectedItem, index) => handleSelect(selectedItem, index)} 
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View>
                                <Feather
                                name='chevron-down'
                                color={colors.text.main}
                                size={30}
                                />
                            </View>
                        )
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View style={{padding: Padding.Medium, borderRadius: 12, width: 140, marginBottom: Padding.Large, justifyContent: "center", alignItems: "center", backgroundColor: colors.textCard.main}}>
                                <Text style={{ margin: Padding.Medium, color: colors.text.main}}>{item}</Text>
                            </View>
                        )
                    }}
                    dropdownStyle={{ justifyContent: "center", alignItems: "center", width: 150, backgroundColor: colors.background.main }}/>
                    <View style={{ marginLeft: Padding.Small, alignItems: "center", justifyContent: "center" }}>
                 
                    </View>
                </View>
                {children}
        </View>
    );
};