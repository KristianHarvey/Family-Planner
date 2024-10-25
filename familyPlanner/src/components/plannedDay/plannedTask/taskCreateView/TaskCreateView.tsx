import React, { useEffect } from "react";
import { User } from "../../../../models/user";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useColor } from "../../../../hooks/useColor";
import { Font, FontSize, Padding } from "../../../../constants/UIConstants";
import { Button } from "../../../button/Button";
import { DayKeyUtils } from "../../../../utils/DayKeyUtils";
import IonIcons from "react-native-vector-icons/Ionicons";
import { CustomCardWithoutText } from "../../../customCard/CustomCardWithoutText";
import { PlannedDayUtility } from "../../../../utils/PlannedDayUtils";
import { TaskDatePickerV2 } from "../taskDatePickerV2/TaskDatePickerV2";
import Feather from "react-native-vector-icons/Feather"
import { PlannedTask, PlannedTaskInput } from "../../../../models/plannedTask";
import { TextInputField } from "../../../atoms/textInputField/TextInputField";

interface TaskCreateViewProps {
    onNameChange?: (name: string) => void;
    onDescriptionChange?: (description: string) => void;
    onStartDateChange?: (date: Date) => void;
    onEndDateChange?: (date: Date) => void;
    onAssignedUserChange?: (user: User) => void;
    onTaskAdd?: (task: PlannedTaskInput) => void;
    tasks?: PlannedTask[];
    onTaskRemove?: (task: PlannedTask) => void;
    chosenDate: Date;
}

export const TaskCreateView: React.FC<TaskCreateViewProps> = ({tasks, onTaskRemove, chosenDate, onNameChange, onDescriptionChange, onStartDateChange, onEndDateChange, onAssignedUserChange, onTaskAdd, ...rest}) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const { startDate, endDate } = PlannedDayUtility.getFullDayRange(new Date(chosenDate));
    console.log(`start date: ${startDate}, end date: ${endDate}`);
    const [changedStartDate, setChangedStartDate] = React.useState(startDate);
    const [changedEndDate, setChangedEndDate] = React.useState(endDate);
    console.log(`start date: ${changedStartDate}, end date: ${changedEndDate}`);
    const [datePickerOpen, setDatePickerOpen] = React.useState(false);
    const [assignedUser, setAssignedUser] = React.useState<User | undefined>();
    const [openTaskCreate, setOpenTaskCreate] = React.useState(false);
    const [taskCards, setTaskCards] = React.useState<PlannedTask[]>(tasks ?? []);
    const [chosenTimeOfDay, setChosenTimeOfDay] = React.useState('');
    const { colors } = useColor();
    const localOffset = new Date().getTimezoneOffset() * 60000;

    useEffect(() => {
        console.log("tasks in TaskCreateView: ", tasks);
        console.log("==============================");
    }, []);
    // useEffect(() => {
    //     setName('');
    //     setDescription('');
    //     setChangedStartDate(startDate);
    //     setChangedEndDate(endDate);
    //     setOpenTaskCreate(false);
    //     setTaskCards([]);
    // }, []);

    const showDatePicker = () => {
        setDatePickerOpen(true);
    }

    const hideDatePicker = () => {
        setDatePickerOpen(false);
    }

    const handleNameChange = (name: string) => {
        setName(name);
        if(onNameChange) {
            onNameChange(name);
        }
    }

    const handleDescriptionChange = (description: string) => {
        setDescription(description);
        if(onDescriptionChange) {
            onDescriptionChange(description);
        }
    }

    const handleTaskDateChange = (startDate: Date, endDate: Date) => {
        console.log(`In task data change: ${startDate}, ${endDate}`);
        setChangedStartDate(startDate);
        setChangedEndDate(endDate);
    }

    const handleTaskAdd = () => {
        console.log("In add: ", changedStartDate.toString(), changedEndDate.toString());
        const task: PlannedTask = {
            name: name,
            description: description,
            startDate: changedStartDate,
            endDate: changedEndDate
        };
        console.log(task);
        if(onTaskAdd) {
            onTaskAdd(task);
        }
        setOpenTaskCreate(false);
        const newTaskForCards = [...taskCards, task];
        setTaskCards(newTaskForCards);
        console.log("Task cards: ", newTaskForCards);
    }

    const handleTaskRemove = (index: any) => {
        const taskToRemove = taskCards[index];
        const updatedTaskCards = [...taskCards];
        updatedTaskCards.splice(index, 1);
        setTaskCards(updatedTaskCards);
        if(onTaskRemove) {
            console.log("Task to remove: ", taskToRemove);
            onTaskRemove(taskToRemove);
        }
    }
    
    useEffect(() => {
        console.log(taskCards);
    }, []);

    return (
        <CustomCardWithoutText style={{}}>
            <View style={{alignItems: "flex-start", justifyContent: "center"}}>
                <Text 
                style={{
                    color: colors.text.secondary, 
                    fontSize: FontSize.Medium, 
                    fontFamily: Font.TitilliumWebRegular
                }}>Oppgaver</Text>
            </View>
            {openTaskCreate ? (
                <View style={{flex: 1}} {...rest}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View style={{ padding: Padding.Medium, alignItems: "flex-end"}}>
                            <IonIcons onPress={() => setOpenTaskCreate(false)} size={30} color={colors.text.main} name="close"/>
                        </View>
                    </View>
                    <View>
                    <TextInputField
                    style={{
                        borderRadius: 5,
                        borderWidth: 0.5,
                        borderColor: colors.text.main,
                        color: colors.text.main,
                        margin: Padding.Small,
                        padding: Padding.Medium,
                        fontFamily: Font.TitilliumWebRegular
                    }}
                    value={name}
                    clearButton
                    placeholder="Oppgave navn"
                    onChangeText={handleNameChange}
                    placeholderTextColor={colors.text.main}
                    />
                    </View>
                        <TextInput
                        style={{
                            borderRadius: 5,
                            borderWidth: 0.5,
                            borderColor: colors.text.main,
                            color: colors.text.main,
                            margin: Padding.Small,
                            padding: Padding.Medium,
                            fontFamily: Font.TitilliumWebRegular
                        }}
                        textAlignVertical="top"
                        editable
                        multiline
                        numberOfLines={5}
                        value={description}
                        placeholder="Oppgave beskrivelse"
                        onChangeText={handleDescriptionChange}
                        placeholderTextColor={colors.text.main}
                        />
                        <View style={{ 
                            padding: Padding.Small,
                            justifyContent: "center", 
                            borderRadius: 10,
                        }}
                        >
                            <TaskDatePickerV2 initialStartDate={startDate} initialEndDate={endDate} onDateChange={handleTaskDateChange} text="Starter" />
                            <View>
                                <Text>{changedEndDate.toString()}</Text>
                            </View>
                            
                        </View>
                    <View style={{alignItems: "flex-end"}}>
                        <Button style={{}} title="Bekreft" onPress={handleTaskAdd}/>
                    </View>
                </View>

            ): (
                <View>
                    {taskCards.length === 0 ? (
                        <View style={{alignItems: "center"}}>
                            <Feather name="chevron-down" size={30} color={colors.text.main} onPress={() => setOpenTaskCreate(true)}/>
                        </View>
                    ): (
                        <View>
                            <Feather name="chevron-down" size={30} color={colors.text.main} onPress={() => setOpenTaskCreate(true)}/>
                            {taskCards.map((taskCard, index) => (
                                <CustomCardWithoutText key={index} color={colors.textCard.secondary}>
                                    <View style={{justifyContent: "flex-end"}}>
                                        <IonIcons onPress={() => handleTaskRemove(index)} size={30} color={colors.text.main} name="close"/>
                                    </View>
                                    <View style={{padding: Padding.Large}}>
                                        <Text style={{color: colors.text.main, margin: Padding.Small}}>Navn: {taskCard.name}</Text>
                                        <Text style={{color: colors.text.main, margin: Padding.Small}}>Beskrivelse: {taskCard.description}</Text>
                                        <Text style={{color: colors.text.main, margin: Padding.Small}}>Start: {DayKeyUtils.formatSelectedDateForView(taskCard.startDate)}</Text>
                                        <Text style={{color: colors.text.main, margin: Padding.Small}}>Slutt: {DayKeyUtils.formatSelectedDateForView(taskCard.endDate)}</Text>
                                        <Text style={{color: colors.text.main, margin: Padding.Small}}>Tid på dagen: {PlannedDayUtility.getTimeOfDayKey(taskCard.startDate, taskCard.endDate)}</Text>
                                    </View>
                                </CustomCardWithoutText>
                            ))}
                        </View>
                    )}

                </View>
            )}
        </CustomCardWithoutText>
    )
};