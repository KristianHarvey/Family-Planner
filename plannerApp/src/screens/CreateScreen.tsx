import { Text, TouchableOpacity, View } from "react-native";
import { useColor } from "../hooks/useColor";
import { Font, FontSize } from "../constants/UIConstants";
import { Button } from "react-native-elements";
import { Calendar, DateData, WeekCalendar } from "react-native-calendars";
import { addWeeks, format, subWeeks } from "date-fns";
import React from "react";
import { PlanService } from "../api/planService";
import { DayKeyUtils } from "../utils/DayKeyUtils";

const CreateScreen = () => {
    const { colors } = useColor();
    const [selectedDay, setSelectedDay] = React.useState(format(new Date(), 'yyyy-MM-dd'));
    const [currentDate, setCurrentDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));

    const handleDayPress = (day: DateData) => {
        const selected = day.dateString;
        console.log(selected)
        setCurrentDate(selected);
        setSelectedDay(selected);
    }

    const handlePreviousWeek = () => {
        const previousWeek = format(subWeeks(new Date(currentDate), 1), 'yyyy-MM-dd');
    }

    const submitNewPlan = async() => {
        
        const daykey = format(new Date().toDateString(), "yyyy-MM-dd");
        const response = await PlanService.createNewPlanAt(daykey, {
            name: "New plan",
            daykey: daykey
        });
        console.log(response);
    }

    const getAllByDaykey = async() => {
        const dayKey = DayKeyUtils.getDayKey(new Date("2024-04-10T00:00:000"));
        console.log(dayKey);
        const response = await PlanService.getAllByDayKey(dayKey);
        console.log(response);
    }

    return (
        <View style={{flex: 1, backgroundColor: colors.background.main}}>

            <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center', 
                backgroundColor: colors.textCard.secondary
            }}>
                <TouchableOpacity 
                style={{
                width: '50%',
                height: 50,
                borderWidth: 3,
                alignItems: 'center',
                justifyContent: 'center', 
                backgroundColor: colors.textCard.secondary
                }}
                onPress={() => setCurrentDate(prevDate => format(subWeeks(new Date(prevDate), 1), 'yyyy-MM-dd'))}>
                    <Text>Forrige uke</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{
                width: '50%',
                height: 50,
                borderWidth: 3,
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: colors.textCard.secondary
                }}
                onPress={() => setCurrentDate(prevDate => format(addWeeks(new Date(prevDate), 1), 'yyyy-MM-dd'))}>
                    <Text>Neste uke</Text>
                </TouchableOpacity>
            </View>
            <Button style={{width: 'auto'}} title="Neste uke" onPress={() => setCurrentDate(prevDate => format(addWeeks(new Date(prevDate), 1), 'yyyy-MM-dd'))}/>
            <Button title="Forrige uke" onPress={() => console.log("Click!")}/>
            <Text 
            style={{
                color: colors.text.main,
                fontFamily: Font.TitilliumWebRegular,
                fontSize: FontSize.Medium,
                textAlign: 'center'
            }}>
                Lag en ny ukeplan
            </Text>
            
                <WeekCalendar key={selectedDay} current={currentDate}
                    onDayPress={handleDayPress} firstDay={1}/>
            <TouchableOpacity style={{ height: 200, backgroundColor: colors.textCard.main }} onPress={submitNewPlan}><Text style={{ color: colors.text.main }}>Create a new plan</Text></TouchableOpacity>

            <TouchableOpacity style={{ height: 200, backgroundColor: colors.textCard.main }} onPress={getAllByDaykey}><Text style={{ color: colors.text.main }}>Get All By Day Key</Text></TouchableOpacity>
        </View>
    )
}
export default CreateScreen;