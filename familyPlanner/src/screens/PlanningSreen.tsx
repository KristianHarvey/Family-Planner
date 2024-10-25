import { Dimensions, FlatList, RefreshControl, SafeAreaView, ScrollView, SectionListData, Text, TouchableOpacity, View } from "react-native";
import { useColor } from "../hooks/useColor";
import { Font, FontSize, Padding } from "../constants/UIConstants";
import { Agenda, AgendaList, Calendar, CalendarProvider, DateData, ExpandableCalendar} from "react-native-calendars";
import { addWeeks, format, subWeeks, parseISO, subDays, addDays } from "date-fns";
import React, { useEffect } from "react";
import { PlannedDayService } from "../api/services/plannedDayService";
import { DayKeyUtils } from "../utils/DayKeyUtils";
import { PlannedDay } from "../models/plannedDay";
import Feather from "react-native-vector-icons/Feather";
import { PlannedTaskCreationScreen } from "./PlannedTaskCreationScreen";
import { useNavigate } from "../hooks/useNavigation";
import { TopBar } from "../components/common/topBar/TopBar";
import { CustomCard } from "../components/customCard/CustomCard";
import { AgendaSectionHeader } from "react-native-calendars/src/expandableCalendar/AgendaListsCommon";
import CalendarHeader from "react-native-calendars/src/calendar/header";
import { PlanListCard } from "../components/plannedDay/planListCard/PlanListCard";
import WeekCalendar from "../components/weekCalendar/WeekCalendar";
import { CalendarCard } from "../components/weekCalendar/calendarCard/CalendarCard";
import { PlanList } from "../components/plannedDay/planList/PlannedDayList";
import { WeekCalendarWidget } from "../components/widget/weekCalendar/WeekCalendarWidget";
import { TodayTimeWidget } from "../components/widget/todayTime/TodayTimeWidget";

const monthToName: { [key: string]: string} = {
    0: "Januar",
    1: "Februar",
    2: "Mars",
    3: "April",
    4: "Mai",
    5: "Juni",
    6: "Juli",
    7: "August",
    8: "September",
    9: "Oktober",
    10: "November",
    11: "Desember"
}

const PlanningScreen = () => {
    const { colors } = useColor();
    const [selectedDay, setSelectedDay] = React.useState(format(new Date(), 'yyyy-MM-dd'));
    const [currentDate, setCurrentDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));
    const [month, setMonth] = React.useState(new Date().getMonth().toString());
    const [isWeekView, setIsWeekView] = React.useState(true);

    const [plannedDay, setPlannedDay] = React.useState<PlannedDay | undefined>();
    const [refreshing, setRefreshing] = React.useState(false);
    const navigate = useNavigate();

    const getPlannedDay = React.useCallback(async() => {
        const dayKey = DayKeyUtils.getDayKey(new Date(selectedDay));
        console.log(`Getting planned day for ${dayKey}`);
        const response = await PlannedDayService.getPlannedDayForCurrentUser(dayKey);
        console.log(`Fetched data: ${response.data}`);
        if(response) {
            setPlannedDay(response.data);
        }
    }, [selectedDay]);


    const handleDayPress = async(day: DateData) => {
        const selected = day.dateString;
        setSelectedDay(selected);
    }


    const handleMonthChange = (month: DateData) => {
        const selected = month.dateString;
        setMonth(new Date(selected).getMonth().toString())
    }

    // const handleDateSelected = (day: moment.Moment) => {
    //     const selected = format(day.date(), "yyyy-MM-dd");
    //     console.log(selected)
    //     setSelectedDay(selected);
    //     getPlannedDay();
    // }

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        await getPlannedDay();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [getPlannedDay, selectedDay]);

    const handleCreateClick = () => {
        console.log(`Navigating with selectedDay: ${selectedDay}`)
        navigate.navigate("PlanCreation", {selectedDay, plannedDay} );
    }

    const handlePreviousWeek = () => {
        const previousWeek = format(subWeeks(new Date(selectedDay), 1), 'yyyy-MM-dd');
    }


    const submitNewPlan = async() => {
        const daykey = format(new Date().toDateString(), "dd-MM-yyyy");
    }

    const getAllByDaykey = async() => {
        const dayKey = DayKeyUtils.getDayKey(new Date("2024-04-10T00:00:000"));
        console.log(dayKey);
        const response = await PlannedDayService.getPlannedDayForCurrentUser(dayKey);
        console.log(response);
    }
 
    useEffect(() => {
        getPlannedDay();
    }, [selectedDay]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.main}}>

            <TopBar middleText="Planlegging"/>
            <ScrollView
                contentContainerStyle={{backgroundColor: colors.background.main}}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <TodayTimeWidget/>
                <WeekCalendarWidget 
                currentDay={currentDate} 
                onDayPress={handleDayPress} 
                selectedDay={new Date(selectedDay)}
                setSelectedDay={setSelectedDay}
                onMonthChange={(month) => setSelectedDay(format(month, "yyyy-MM-dd"))}>

                    <View style={{
                        alignItems: "flex-end",
                        marginRight: Padding.Small,
                        marginTop: Padding.Small
                    }}>

                        <Feather style={{
                            }} 
                        color={colors.text.main} 
                        name="plus" 
                        size={30}
                        onPress={handleCreateClick}/>

                    </View>

                    <ScrollView>

                        <PlanList 
                        plannedDay={plannedDay} 
                        currentDate={selectedDay}/>

                    </ScrollView>
                </WeekCalendarWidget>
            </ScrollView>
        </SafeAreaView>
    )
}
export default PlanningScreen;