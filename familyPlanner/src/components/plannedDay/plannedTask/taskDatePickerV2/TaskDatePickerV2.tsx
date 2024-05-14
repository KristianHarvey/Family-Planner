import React from "react";
import { PlannedDayUtility } from "../../../../utils/PlannedDayUtils";
import { Dimensions, Switch, Text, TouchableOpacity, View } from "react-native";
import { Font, FontSize, Padding } from "../../../../constants/UIConstants";
import { useColor } from "../../../../hooks/useColor";
import { parseISO } from "date-fns";
import moment from "moment-timezone";
import { DayKeyUtils } from "../../../../utils/DayKeyUtils";


interface TaskDatePickerProps {
    onDateChange: (startDate: Date, endDate: Date) => void;
    initialStartDate: Date;
    initialEndDate: Date;
    text: string;
    isLast?: boolean;
}

export const TaskDatePickerV2: React.FC<TaskDatePickerProps> = ({text, initialStartDate, initialEndDate, onDateChange}) => {
    const [startDateState, setStartDateState] = React.useState(DayKeyUtils.getLocalDateObject(initialStartDate));
    const [endDateState, setEndDateState] = React.useState(DayKeyUtils.getLocalDateObject(initialStartDate));
    const [calendarOpen, setCalendarOpen] = React.useState(false);
    const [timePickerOpen, setTimePickerOpen] = React.useState(false);
    const [chosenTimeOfDay, setChosenTimeOfDay] = React.useState('');
    const [isSwitchEnabled, setIsSwitchEnabled] = React.useState(false);
    const [hasChosenTimeOfDay, setHasChosenTimeOfDay] = React.useState(false);
    const { colors } = useColor();

    const dropdownChoices = ["Morgen", "Formiddag", "Ettermiddag", "Kveld"];

    React.useEffect(() => {
        if(!isSwitchEnabled) {
            const {startDate, endDate} = PlannedDayUtility.getFullDayRange(startDateState);
            onDateChange(startDate, endDate);
        }
    }, [isSwitchEnabled]);

    const toggleSwitch = () => setIsSwitchEnabled(previousState => !previousState);

    const handleChoice = (choice: any) => {
        // console.log(index);
        // const choice = dropdownChoices[index];
        console.log(choice)
        setChosenTimeOfDay(choice);
        const { startDate, endDate } = PlannedDayUtility.setDateForKey(choice, startDateState);
        console.log(`Choice: ${choice}, start: ${startDate}, end: ${endDate}`);
        onDateChange(startDate, endDate);
        setHasChosenTimeOfDay(true);
    }

    const renderChoice = (choice: string, index: any) => {
        const isSelected = choice === chosenTimeOfDay;
        const choiceWidth = Dimensions.get('window').width;
        return (
            <TouchableOpacity 
            key={index}
            style={{ 
                borderRadius: Padding.Medium,
                backgroundColor: isSelected ? colors.text.secondary : colors.background.main,
                width: choiceWidth / 4.5,
                justifyContent: "center",
                alignItems: "center",
                margin: Padding.Small,
                padding: Padding.Medium,
                height: 60
            }}
            onPress={() => handleChoice(choice)}>
                <Text style={{color: colors.text.main}}>{choice}</Text>
            </TouchableOpacity>
        ) 
    }

    return (
        <View style={{}}>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: Padding.Medium, marginBottom: Padding.Medium}}>
                <Text style={{marginLeft: Padding.Medium, fontSize: FontSize.Small, color: colors.text.main, fontFamily: Font.TitilliumWebRegular}}>Spesifikk tid på dagen</Text>
                <View style={{flex: 1, alignItems: "flex-end"}}>
                <Switch 
                trackColor={{false: colors.background.main, true: colors.text.main}}
                thumbColor={isSwitchEnabled ? colors.text.secondary : colors.text.main}
                onValueChange={toggleSwitch}
                value={isSwitchEnabled}/>
                </View>
            </View>
            {isSwitchEnabled ? (
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <View style={{flexDirection: "row", padding: Padding.Medium}}>
                        {dropdownChoices.map(renderChoice)}
                    </View>
                </View>
            ): (
                <>
                </>
            )}
        </View>
    )

}