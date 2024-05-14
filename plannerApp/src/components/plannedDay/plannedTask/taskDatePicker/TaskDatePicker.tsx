import React from "react";
import { useColor } from "../../../../hooks/useColor";
import { PlannedDayUtility } from "../../../../utils/PlannedDayUtils";
import { Dimensions, Switch, Text, TouchableOpacity, View } from "react-native";
import { Font, FontSize, Padding } from "../../../../constants/UIConstants";
import moment from "moment-timezone";

interface TaskDatePickerProps {
    onDateChange: (startDate: Date, endDate: Date) => void;
    initialStartDate: Date;
    initialEndDate: Date;
    text: string;
    isLast?: boolean;
}

export const TaskDatePicker: React.FC<TaskDatePickerProps> = ({text, initialStartDate, initialEndDate, onDateChange}) => {
    const realHours = initialStartDate.getHours();
    const realHours2 = initialEndDate.getHours();
    console.log("Hours: ", realHours);
    const newStartDate = new Date(initialStartDate);
    const newEndDate = new Date(initialEndDate);
    newStartDate.setUTCHours(realHours);
    newEndDate.setUTCHours(realHours2);

    console.log('New date:', newStartDate);
    console.log("initial:", initialStartDate);
    const [startDateState, setStartDateState] = React.useState(newStartDate);
    console.log("initial:", startDateState);
    const [endDateState, setEndDateState] = React.useState(newEndDate);
    const [calendarOpen, setCalendarOpen] = React.useState(false);
    const [timePickerOpen, setTimePickerOpen] = React.useState(false);
    const [chosenTimeOfDay, setChosenTimeOfDay] = React.useState('');
    const [isSwitchEnabled, setIsSwitchEnabled] = React.useState(false);
    const [hasChosenTimeOfDay, setHasChosenTimeOfDay] = React.useState(false);
    const { colors } = useColor();

    const dropdownChoices = ["Morgen", "Formiddag", "Ettermiddag", "Kveld"];
    const standardChoice = "Hele dagen";

    React.useEffect(() => {
        console.log("start date: ", initialStartDate);
        console.log("End date:", initialEndDate);
    }, []);

    const toggleSwitch = () => setIsSwitchEnabled(previousState => !previousState);

    React.useEffect(() => {
        if(!isSwitchEnabled) {
            const {startDate, endDate} = PlannedDayUtility.getFullDayRange(startDateState);
            onDateChange(startDate, endDate);
        }
    }, [isSwitchEnabled])

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
    // const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    //     setDate(date!);
    //     onDateChange(date!);
    //     setTimePickerOpen(false);
    // }

    // const handleDateChangev2 = (date: Date) => {
    //     setDate(date);
    //     onDateChange(date);
    //     setTimePickerOpen(false);
    // }

    const handleSelect = (selectedItem: any, index: any) => {
        const choice = dropdownChoices[index];
  
        setChosenTimeOfDay(choice);
        const { startDate, endDate } = PlannedDayUtility.setDateForKey(choice, startDateState);
        console.log(`Choice: ${choice}, start: ${startDate}, end: ${endDate}`);
        onDateChange(startDate, endDate);
    }


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
    // const handleSelect = (item: any, index: any) => {
    //     onMonthChange(new Date(currentDate.setMonth(index)));
    //     setMonth(item);
    // }

    return (
        <View style={{borderColor: colors.text.main }}>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", padding: Padding.Small}}>
                <Text style={{marginLeft: Padding.Medium, fontSize: FontSize.Small, color: colors.text.main, fontFamily: Font.TitilliumWebRegular}}>Spesifikk tid på dagen</Text>
                <Switch 
                trackColor={{false: colors.background.main, true: colors.text.main}}
                thumbColor={isSwitchEnabled ? colors.text.secondary : colors.text.main}
                onValueChange={toggleSwitch}
                value={isSwitchEnabled}/>
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