import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useColor } from "../hooks/useColor"
import { TopBar } from "../components/topBar/TopBar";
import React, { useEffect } from "react";
import { Font, Padding } from "../constants/UIConstants";
import { useRoute } from "@react-navigation/native";
import { DayKeyUtils } from "../utils/DayKeyUtils";
import { PlannedDayService } from "../api/services/plannedDayService";
import { useNavigate } from "../hooks/useNavigation";
import { Button } from "../components/button/Button";
import { TaskItem, TaskItemInput } from "../models/task";
import { Activity, ActivityInput } from "../models/activity";
import { Meal, MealInput } from "../models/meal";
import { TaskCreateView } from "../components/plannedDay/plannedTask/taskCreateView/TaskCreateView";
import { PlannedDay, PlannedDayInput } from "../models/plannedDay";
import { CustomCardWithoutText } from "../components/customCard/CustomCardWithoutText";
import { ActivityCreateView } from "../components/plannedDay/activity/activityCreateView/ActivityCreateView";
import { PlannedTask, PlannedTaskInput } from "../models/plannedTask";
import { PlannedDayController } from "../api/controllers/PlannedDayController";
import { PlannedDayService2 } from "../api/services/plannedDayService2";

interface PlanCreationScreenProps {
    selectedDay: string;
}

export const PlannedTaskCreationScreen = ( {} ) => {
    const route = useRoute();
    const { plannedDay } = route.params as {plannedDay: PlannedDay};
    const [changedPlannedDay, setChangedPlannedDay] = React.useState(plannedDay);
    const [plannedTaskName, setPlannedTaskName] = React.useState('');

    const [taskDescription, setTaskDescription] = React.useState('');

    const [activityName, setActivityName] = React.useState('');
    const [activityDescription, setActivityDescription] = React.useState('');

    const [plannedTasks, setPlannedTasks] = React.useState<PlannedTask[]>([]); 
    const [wantsToAddTasks, setWantsToAddTasks] = React.useState<boolean>(false);
    const [activities, setActivities] = React.useState<Activity[]>([]);
    const [meals, setMeals] = React.useState<Meal[]>([]);
    const { colors } = useColor();
    const navigate = useNavigate();
    console.log(route.params);
    const { selectedDay } = route.params as {selectedDay: string};

    const handleCreateNewPlan = async() => {
        console.log(route.params);
        console.log(selectedDay);
        if(selectedDay) {
            console.log(plannedTasks);
            const daykey = DayKeyUtils.getDayKey(new Date(selectedDay));
            const newPlannedDay = await PlannedDayService.createUpdatePlannedDay(daykey, {
                id: plannedDay.id ?? 0,
                dayKey: daykey,
                plannedTasks: plannedTasks,
                activities: activities,
                meals: meals
            })
            setChangedPlannedDay(newPlannedDay.data!);
            console.log(`name: ${plannedTaskName} daykey: ${daykey}`);
        }
        setPlannedTasks([]);
        setPlannedTaskName('');
        setTaskDescription('');
    }


    const handleTaskAdd = (task: PlannedTask) => {
        const newTasks = [...plannedTasks, task];
        setPlannedTasks(newTasks);
        console.log("Tasks for plan: ", newTasks);
    }

    const handleActivityAdd = (activity: Activity) => {
        const newActivities = [...activities, activity];
        setActivities(newActivities);
        console.log("Tasks for plan: ", newActivities);
    }

    const handleTaskRemove = (taskToRemove: PlannedTaskInput) => {
        const indexToRemove = plannedTasks.findIndex(task => task === taskToRemove);
        if(indexToRemove !== -1) {
            const updatedTasks = [...plannedTasks];
            updatedTasks.splice(indexToRemove, 1);
            setPlannedTasks(updatedTasks);
        }
    }

    const handleActivityRemove = (activityToRemove: ActivityInput) => {
        const indexToRemove = activities.findIndex(activity => activity === activityToRemove);
        if(indexToRemove !== -1) {
            const updatedActivites = [...activities];
            updatedActivites.splice(indexToRemove, 1);
            setActivities(updatedActivites);
        }
    }
    useEffect(() => {
        console.log("tasks: ", plannedTasks);
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: colors.background.main}}>
            <ScrollView style={{flex: 1, backgroundColor: colors.background.main}}>
                <TopBar cameFromScreen="Create"/>
                <View style={{flex: 1}}>
                    <TaskCreateView chosenDate={new Date(selectedDay)} tasks={plannedTasks} onNameChange={(name) => setPlannedTaskName(name)} onTaskAdd={handleTaskAdd} onTaskRemove={handleTaskRemove}/>
                    <ActivityCreateView chosenDate={new Date(selectedDay)} activities={activities} onNameChange={(name) => setActivityName(name)} onActivityAdd={handleTaskAdd} onActivityRemove={handleTaskRemove}/>
                </View>

            </ScrollView>
                <View style={{
                    justifyContent: "flex-end",
                }}>
                    <Button onPress={handleCreateNewPlan} title="Lag ny plan"/>
                </View>
        </View>
    )
}