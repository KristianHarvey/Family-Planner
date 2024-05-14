import React from "react";
import { Activity, ActivityInput } from "../../../../models/activity";
import { PlannedDayUtility } from "../../../../utils/PlannedDayUtils";
import { useColor } from "../../../../hooks/useColor";
import { CustomCardWithoutText } from "../../../customCard/CustomCardWithoutText";
import { Text, TextInput, View } from "react-native";
import { Font, FontSize, Padding } from "../../../../constants/UIConstants";
import IonIcons from "react-native-vector-icons/Ionicons"
import { TaskDatePickerV2 } from "../../plannedTask/taskDatePickerV2/TaskDatePickerV2";
import Feather from "react-native-vector-icons/Feather"
import { Button } from "../../../button/Button";
import { DayKeyUtils } from "../../../../utils/DayKeyUtils";

interface TaskCreateViewProps {
    onNameChange?: (name: string) => void;
    onDescriptionChange?: (description: string) => void;
    onStartDateChange?: (date: Date) => void;
    onEndDateChange?: (date: Date) => void;
    onActivityAdd?: (activity: ActivityInput) => void;
    activities?: ActivityInput[];
    onActivityRemove?: (activity: ActivityInput) => void;
    chosenDate: Date;
}

export const ActivityCreateView: React.FC<TaskCreateViewProps> = ({activities, onActivityRemove, chosenDate, onNameChange, onDescriptionChange, onStartDateChange, onEndDateChange, onActivityAdd, ...rest}) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const { startDate, endDate } = PlannedDayUtility.getFullDayRange(new Date(chosenDate));
    console.log(`start date: ${startDate}, end date: ${endDate}`);
    const [changedStartDate, setChangedStartDate] = React.useState(startDate);
    const [changedEndDate, setChangedEndDate] = React.useState(endDate);
    const [datePickerOpen, setDatePickerOpen] = React.useState(false);
    const [openActivityCreate, setOpenActivityCreate] = React.useState(false);
    const [activityCards, setActivityCards] = React.useState<ActivityInput[]>(activities ?? []);
    const [chosenTimeOfDay, setChosenTimeOfDay] = React.useState('');
    const { colors } = useColor();
    const localOffset = new Date().getTimezoneOffset() * 60000;

    React.useEffect(() => {
        console.log("activities in ActivityCreateView: ", activities);
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

    const handleActivityDateChange = (startDate: Date, endDate: Date) => {
        console.log(`In task data change: ${startDate}, ${endDate}`);
        setChangedStartDate(startDate);
        setChangedEndDate(endDate);
    }

    const handleActivityAdd = () => {
        console.log("In add: ", changedStartDate.toString(), changedEndDate.toString());
        const activity: ActivityInput = {
            name: name,
            description: description,
            startDate: changedStartDate,
            endDate: changedEndDate

        };
        console.log(activity);
        if(onActivityAdd) {
            onActivityAdd(activity);
        }
        setOpenActivityCreate(false);
        const newActivityCards = [...activityCards, activity];
        setActivityCards(newActivityCards);
    }

    const handleTaskRemove = (index: any) => {
        const activityToRemove = activityCards[index];
        const updatedActivityCards = [...activityCards];
        updatedActivityCards.splice(index, 1);
        setActivityCards(updatedActivityCards);
        if(onActivityRemove) {
            console.log("Task to remove: ", activityToRemove);
            onActivityRemove(activityToRemove);
        }
    }
    
    React.useEffect(() => {
        console.log(activityCards);
    }, []);

    return (
        <CustomCardWithoutText>
            <View style={{alignItems: "flex-start", justifyContent: "center"}}>
                <Text 
                style={{
                    color: colors.text.secondary, 
                    fontSize: FontSize.Medium, 
                    fontFamily: Font.TitilliumWebRegular
                }}>Aktiviteter</Text>
            </View>
            {openActivityCreate ? (
                <View style={{flex: 1}} {...rest}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View style={{ padding: Padding.Medium, alignItems: "flex-end"}}>
                            <IonIcons onPress={() => setOpenActivityCreate(false)} size={30} color={colors.text.main} name="close"/>
                        </View>
                    </View>
                    <View>
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
                    value={name}
                    placeholder="Aktivitet navn"
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
                        placeholder="Aktivitet beskrivelse"
                        onChangeText={handleDescriptionChange}
                        placeholderTextColor={colors.text.main}
                        />
                        <View style={{ 
                            padding: Padding.Small,
                            justifyContent: "center", 
                            borderRadius: 10,
                        }}
                        >
                            <TaskDatePickerV2 initialStartDate={startDate} initialEndDate={endDate} onDateChange={handleActivityDateChange} text="Starter" />
                            <View>
                                <Text>{changedEndDate.toString()}</Text>
                            </View>
                            
                        </View>
                    <View style={{alignItems: "flex-end"}}>
                        <Button style={{}} title="Bekreft" onPress={handleActivityAdd}/>
                    </View>
                </View>
            ) : (
             <View>
                    {activityCards.length === 0 ? (
                        <View style={{alignItems: "center"}}>
                            <Feather name="chevron-down" size={30} color={colors.text.main} onPress={() => setOpenActivityCreate(true)}/>
                        </View>
                    ): (
                        <View>
                            <Feather name="chevron-down" size={30} color={colors.text.main} onPress={() => setOpenActivityCreate(true)}/>
                            {activityCards.map((activityCard, index) => (
                                <CustomCardWithoutText key={index} color={colors.textCard.secondary}>
                                    <View style={{justifyContent: "flex-end"}}>
                                        <IonIcons onPress={() => handleTaskRemove(index)} size={30} color={colors.text.main} name="close"/>
                                    </View>
                                    <View style={{padding: Padding.Large}}>
                                        <Text style={{color: colors.text.main, margin: Padding.Small}}>Navn: {activityCard.name}</Text>
                                        <Text style={{color: colors.text.main, margin: Padding.Small}}>Beskrivelse: {activityCard.description}</Text>
                                        <Text style={{color: colors.text.main, margin: Padding.Small}}>Start: {DayKeyUtils.formatSelectedDateForView(activityCard.startDate)}</Text>
                                        <Text style={{color: colors.text.main, margin: Padding.Small}}>Slutt: {DayKeyUtils.formatSelectedDateForView(activityCard.endDate)}</Text>
                                        <Text style={{color: colors.text.main, margin: Padding.Small}}>Tid på dagen: {PlannedDayUtility.getTimeOfDayKey(activityCard.startDate, activityCard.endDate)}</Text>
                                    </View>
                                </CustomCardWithoutText>
                            ))}
                        </View>
                    )}

                </View>
            )}
        </CustomCardWithoutText>
        // <CustomCardWithoutText style={{}}>
        //     {openTaskCreate ? (
        //         <View {...rest}>
        //             <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        //                 <View style={{alignItems: "flex-start", justifyContent: "center"}}>
        //                     <Text 
        //                     style={{
        //                         color: colors.text.main, 
        //                         fontSize: FontSize.Medium, 
        //                         fontFamily: Font.TitilliumWebRegular
        //                     }}>Aktiviteter</Text>
        //                 </View>
        //                 <View style={{ padding: Padding.Medium, alignItems: "flex-end"}}>
        //                     <IonIcons onPress={() => setOpenTaskCreate(false)} size={30} color={colors.text.main} name="close"/>
        //                 </View>
        //             </View>
        //             <View>
        //             <TextInput
        //             style={{
        //                 borderRadius: 5,
        //                 borderWidth: 0.5,
        //                 borderColor: colors.text.main,
        //                 color: colors.text.main,
        //                 margin: Padding.Small,
        //                 padding: Padding.Medium,
        //                 fontFamily: Font.TitilliumWebRegular
        //             }}
        //             value={name}
        //             placeholder="Oppgave navn"
        //             onChangeText={handleNameChange}
        //             placeholderTextColor={colors.text.main}
        //             />
        //             </View>
        //                 <TextInput
        //                 style={{
        //                     borderRadius: 5,
        //                     borderWidth: 0.5,
        //                     borderColor: colors.text.main,
        //                     color: colors.text.main,
        //                     margin: Padding.Small,
        //                     padding: Padding.Medium,
        //                     fontFamily: Font.TitilliumWebRegular
        //                 }}
        //                 textAlignVertical="top"
        //                 editable
        //                 multiline
        //                 numberOfLines={5}
        //                 value={description}
        //                 placeholder="Oppgave beskrivelse"
        //                 onChangeText={handleDescriptionChange}
        //                 placeholderTextColor={colors.text.main}
        //                 />
        //                 <View style={{ 
        //                     padding: Padding.Small,
        //                     justifyContent: "center", 
        //                     borderRadius: 10,
        //                 }}
        //                 >
        //                     <TaskDatePickerV2 initialStartDate={startDate} initialEndDate={endDate} onDateChange={handleActivityDateChange} text="Starter" />
        //                     <View>
        //                     <Text>{changedEndDate.toString()}</Text>
        //                     </View>
                            
        //                 </View>
        //             <Button title="Legg til oppgave" onPress={handleActivityAdd}/>
        //         </View>

        //     ): (
        //         <View>
        //             {activityCards.length === 0 ? (
        //                 <Button title="Vil du legge til aktiviteter?" onPress={() => setOpenTaskCreate(true)}/>
        //             ): (
        //                 <View>
        //                     <Button title="Vil du legge til flere aktiviteter?" onPress={() => setOpenTaskCreate(true)}/>
        //                     {activityCards.map((activityCard, index) => (
        //                         <CustomCardWithoutText key={index} color={colors.textCard.secondary}>
        //                             <View style={{justifyContent: "flex-end"}}>
        //                                 <IonIcons onPress={() => handleTaskRemove(index)} size={30} color={colors.text.main} name="close"/>
        //                             </View>
        //                             <View style={{padding: Padding.Large}}>
        //                                 <Text style={{color: colors.text.main, margin: Padding.Small}}>Navn: {activityCard.name}</Text>
        //                                 <Text style={{color: colors.text.main, margin: Padding.Small}}>Beskrivelse: {activityCard.description}</Text>
        //                                 <Text style={{color: colors.text.main, margin: Padding.Small}}>Start: {DayKeyUtils.formatSelectedDateForView(activityCard.startDate)}</Text>
        //                                 <Text style={{color: colors.text.main, margin: Padding.Small}}>Slutt: {DayKeyUtils.formatSelectedDateForView(activityCard.endDate)}</Text>
        //                                 <Text style={{color: colors.text.main, margin: Padding.Small}}>Tid på dagen: {PlannedDayUtility.getTimeOfDayKey(activityCard.startDate, activityCard.endDate)}</Text>
        //                             </View>
        //                         </CustomCardWithoutText>
        //                     ))}
        //                 </View>
        //             )}

        //         </View>
        //     )}
        // </CustomCardWithoutText>
    )
};