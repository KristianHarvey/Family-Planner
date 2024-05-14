import { Dimensions, FlatList, RefreshControl, SafeAreaView, ScrollView, SectionListData, Text, TouchableOpacity, View } from "react-native";
import { useColor } from "../hooks/useColor";
import { Font, FontSize, Padding } from "../constants/UIConstants";
import { Button } from "react-native-elements";
import { Agenda, AgendaList, Calendar, CalendarProvider, DateData, ExpandableCalendar} from "react-native-calendars";
import { addWeeks, format, subWeeks, parseISO, subDays, addDays } from "date-fns";
import React, { useEffect } from "react";
import { PlannedDayService } from "../api/services/plannedDayService";
import { DayKeyUtils } from "../utils/DayKeyUtils";
import { PlannedDay } from "../models/plannedDay";
import Feather from "react-native-vector-icons/Feather";
import { PlannedTaskCreationScreen } from "./PlannedTaskCreationScreen";
import { useNavigate } from "../hooks/useNavigation";
import { TopBar } from "../components/topBar/TopBar";
import { CustomCard } from "../components/customCard/CustomCard";
import { AgendaSectionHeader } from "react-native-calendars/src/expandableCalendar/AgendaListsCommon";
import { ListItem } from "react-native-elements/dist/list/ListItem";
import ReactNativeCalendarStrip from "react-native-calendar-strip";
import CalendarHeader from "react-native-calendars/src/calendar/header";
import { PlanListCard } from "../components/plannedDay/planListCard/PlanListCard";
import WeekCalendar from "../components/weekCalendar/WeekCalendar";
import { CalendarCard } from "../components/weekCalendar/calendarCard/CalendarCard";
import { PlanList } from "../components/plannedDay/planList/PlannedDayList";

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
        console.log(selectedDay);
        const dayKey = DayKeyUtils.getDayKey(new Date(selectedDay));
        console.log(new Date(selectedDay));
        const response = await PlannedDayService.getPlannedDayForCurrentUser(dayKey);
        if(response) {
            console.log("Fetched from database: ", response);
            setPlannedDay(response.data);
        }
    }, [selectedDay])

    useEffect(() => {
        console.log("Planned day in Planning screen", plannedDay);
    }, [])

    const handleDayPress = async(day: DateData) => {
        const selected = day.dateString;
        console.log(selected)
        setSelectedDay(selected);
        await getPlannedDay();
    }


    const handleMonthChange = (month: DateData) => {
        const selected = month.dateString;
        setMonth(new Date(selected).getMonth().toString())
    }

    const handleDateSelected = (day: moment.Moment) => {
        const selected = format(day.date(), "yyyy-MM-dd");
        console.log(selected)
        setSelectedDay(selected);
        getPlannedDay();
    }

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
        const fetchData = async() => {
            await getPlannedDay();
        }
        fetchData();
    }, [selectedDay]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.main}}>
            <TopBar/>
            <ScrollView
                contentContainerStyle={{flexGrow: 1, backgroundColor: colors.background.main}}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <View style={{backgroundColor: colors.background.main}}>
                <CalendarCard currentDate={new Date(selectedDay)} onMonthChange={(month) => setSelectedDay(format(month, "yyyy-MM-dd"))}>
                        <WeekCalendar currentDay={currentDate} onDayPress={handleDayPress} selectedDay={new Date(selectedDay)} setSelectedDay={setSelectedDay}/>
                        
                        {/* <CalendarProvider date={selectedDay}>
                        <WeekCalendar onDayPress={handleDayPress} key={selectedDay} current={selectedDay}/>
                        </CalendarProvider> */}
                        {/* <Calendar 
                        enableSwipeMonths
                        initialDate={selectedDay}
                        date={selectedDay}
                        theme={{ 
                            calendarBackground: colors.background.main, 
                            todayBackgroundColor: colors.text.secondary,
                            dotColor: colors.text.secondary,
                            arrowColor: colors.text.main,
                            indicatorColor: colors.text.secondary,
                            todayTextColor: colors.text.main,
                            todayDotColor: colors.text.secondary,
                            agendaDayTextColor: colors.text.secondary,
                            selectedDotColor: colors.text.secondary, 
                            dayTextColor: colors.text.main, 
                            selectedDayBackgroundColor: colors.text.secondary, 
                            selectedDayTextColor: colors.text.secondary

                            
                        }}
                        onMonthChange={handleMonthChange}
                        onDayPress={handleDayPress}
                        collapsable={true}
                        firstDay={1} 
                        current={selectedDay} 
                        key={selectedDay} 
                        /> */}
                        {/* <Agenda/>
                        {/* <Calendar showWeekNumbers={true}/> */}
                        {/* <CalendarProvider testID="id" date={selectedDay} style={{borderRadius: Padding.Large, alignItems: "center", justifyContent: "center"}}>
                            <ExpandableCalendar 
                            firstDay={1}
                            showWeekNumbers={false} 
                            calendarStyle={{ flexDirection: "row", justifyContent: "space-around", margin: -Padding.Medium , alignItems: "center"}}
                            contentContainerStyle={{ backgroundColor: colors.background.main, alignItems: "center"}} 
                            theme={{ calendarBackground: colors.background.main, selectedDotColor: colors.text.secondary, selectedDayBackgroundColor: colors.text.secondary}} 
                            
                            showScrollIndicator={true}
                            current={currentDate}/>
                            {/* <WeekCalendar 
                            contentContainerStyle={{ alignItems: "center"}}
                            headerStyle={{flexDirection: "row", justifyContent: "space-around", paddingHorizontal: Padding.XLarge}}
                            centerContent={true}
                            enableSwipeMonths={true}
                            showWeekNumbers={true}
                            scrollEnabled={true}
                            theme={{ calendarBackground: colors.background.main, dotColor: colors.text.secondary }} 
                            key={selectedDay} 
                            current={selectedDay}
                            onDayPress={handleDayPress} 
                            firstDay={1}
                            testID="id"
                            calendarHeight={80}
                            />
                        </CalendarProvider> */}

                <View style={{
                    alignItems: "flex-end",
                    marginRight: Padding.Small,
                    marginTop: Padding.Small
                }}>
                    <Feather style={{
                        marginRight: Padding.Large
                        }} 
                    color={colors.text.main} 
                    name="plus" 
                    size={30}
                    onPress={handleCreateClick}/>
                </View>
                <ScrollView 
                style={{ padding: Padding.Large }}
                contentContainerStyle={{}}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                    <PlanList plannedDay={plannedDay} currentDate={selectedDay}/>
                </ScrollView>
                </CalendarCard>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default PlanningScreen;