import React from "react";
import { ShoppingList } from "../../../../models/shoppingList"
import { WidgetBase } from "../../widgetBase/WidgetBase";
import { Text, View } from "react-native";
import { useColor } from "../../../../hooks/useColor";
import { Font, FontSize, Padding } from "../../../../constants/UIConstants";
import { Button } from "../../../button/Button";
import WeekCalendar from "../../../weekCalendar/WeekCalendar";
import { DayKeyUtils } from "../../../../utils/DayKeyUtils";
import { format } from "date-fns";
import { DateData } from "react-native-calendars";

interface Props {
    shoppingList?: ShoppingList;
    onConfirmedPlannedDay?: () => void;
    onPlannedDayRequest?: (selectedDay: string) => void;
}

export const ShoppingListPlanWidget: React.FC<Props> = ({
    shoppingList, 
    onPlannedDayRequest, 
    onConfirmedPlannedDay
}) => {
    const { colors } = useColor();
    const [planingState, setPlanningState] = React.useState(false);
    const [selectedDay, setSelectedDay] = React.useState(DayKeyUtils.getDayKey(new Date()));

    const handleDayChange = (day: string) => {
        setSelectedDay(day);
        if(onPlannedDayRequest) {
            onPlannedDayRequest(day);
        }
    }

    React.useEffect(() => {
        console.log("Selected day: ", selectedDay);
    }, [selectedDay])
    return (
        <WidgetBase
        sideMargins>
            <Text
            style={{
                color: colors.text_main,
                fontFamily: Font.TitilliumWebRegular,
                fontSize: FontSize.Medium
            }}>
                Vil du planlegge handlelisten til en dag?
            </Text>
            <View style={{padding: Padding.Medium}}/>
            {!planingState ? (
                <Button title="Planlegg" onPress={() => setPlanningState(!planingState)}/>

            ): (
                <View>
                    <WeekCalendar currentDay={DayKeyUtils.getDayKey(new Date())} selectedDay={new Date(selectedDay)} setSelectedDay={handleDayChange}/>
                    <View style={{ padding: Padding.Large }}/>
                    <Button title="Bekreft" onPress={onConfirmedPlannedDay}/>
                </View>
            )}
        </WidgetBase>
    )
}