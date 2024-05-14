import React, { PropsWithChildren } from "react";
import { WidgetBase } from "../widgetBase/WidgetBase";
import { Text, View } from "react-native";
import { useColor } from "../../../hooks/useColor";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";
import WeekCalendar from "../../weekCalendar/WeekCalendar";
import SelectDropdown from "react-native-select-dropdown";
import { format } from "date-fns";
import { DateData } from "react-native-calendars";
import Feather from "react-native-vector-icons/Feather";

interface Props extends PropsWithChildren {
    currentDay: string;
    onMonthChange: (month: Date) => void;
    selectedDay: Date;
    setSelectedDay: (selectedDay: string) => void;
    onDayPress: (day: DateData) => void;
};

export const WeekCalendarWidget: React.FC<Props> = ({
    currentDay, 
    onMonthChange, 
    selectedDay, 
    setSelectedDay, 
    onDayPress,
    children
}) => {
    const { colors } = useColor();
    const [currentDate, setCurrentDate] = React.useState(new Date(currentDay));
    const months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];
    const currentMonthIndex = currentDate.getMonth();
    const [month, setMonth] = React.useState(months[currentMonthIndex]);
    
    const handleSelect = (item: any, index: any) => {
        onMonthChange(new Date(currentDate.setMonth(index)));
        setMonth(item);
    }

    const handleTodayButtonPressed = () => {
        const today = new Date(currentDay);
        const currentMonthIndex = today.getMonth();
        const newDate = new Date(currentDate);
        newDate.setMonth(currentMonthIndex);
        setCurrentDate(newDate);
        setMonth(months[currentMonthIndex]);
        onMonthChange(newDate);
    };
    return(
        <WidgetBase
        sideMargins>
            <View style={{ 
                flexDirection: "row", 
                padding: Padding.Large, 
            }}>
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
            </View>

            <WeekCalendar 
            currentDay={currentDay} 
            selectedDay={selectedDay} 
            onDayPress={onDayPress}
            setSelectedDay={setSelectedDay}
            onTodayButtonPress={handleTodayButtonPressed}/>

            {children}
        </WidgetBase>
    )
}