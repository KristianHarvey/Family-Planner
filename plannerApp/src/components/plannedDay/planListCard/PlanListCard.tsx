import { Text, TouchableOpacity, View } from "react-native";
import { useColor } from "../../../hooks/useColor";
import { Font, Padding } from "../../../constants/UIConstants";
import { format } from "date-fns";
import { DayKeyUtils } from "../../../utils/DayKeyUtils";
import { useNavigate } from "../../../hooks/useNavigation";
import { PlannedTask } from "../../../models/plannedTask";
import { PlannedDay } from "../../../models/plannedDay";

interface PlannedTaskListCardProps {
    plannedDay?: PlannedDay;
    currentDate: string;
}

export const PlanListCard: React.FC<PlannedTaskListCardProps> = ({plannedDay, currentDate}) => {
    const { colors } = useColor();
    // const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const navigate = useNavigate();

    const handleNavigateToTask = (plannedTaskId?: number) => {
        navigate.navigate("Plan", {plannedTaskId});
    }
    const handleNavigateToActivity = (activityId?: number) => {
        navigate.navigate("Plan", {activityId});
    }
    const handleNavigateToPlannedMeals = (mealId?: number) => {
        navigate.navigate("Plan", {mealId});
    }


    return (
        <View style={{
            backgroundColor: colors.textCard.secondary,
            margin: Padding.Small,
            marginTop: Padding.XLarge,
            borderRadius: 6,
            shadowColor: colors.text.main,
            shadowOpacity: 0.8,
            shadowRadius: 1,
            shadowOffset: {width: 0, height: 5},
            elevation: 6,
        }}>
            <View style={{
                display: "flex",
                bottom: 10,
            }}>
                {plannedDay ? (
                    plannedDay.plannedTasks?.map((plannedtask, index) => {
                        return (
                            <TouchableOpacity
                            key={index} style={{padding: Padding.Large}}
                            onPress={() => handleNavigateToTask(plannedtask.id)}>
                                <View style={{marginLeft: Padding.Small, }}>
                                    <Text style={{color: colors.text.main}}>{plannedtask.name}</Text>
                                </View>
                                <View style={{justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{color: colors.text.main}}>{plannedtask.description}</Text>
                                    {plannedtask.status ? (
                                        <Text style={{color: colors.text.main}}>{plannedtask.status}</Text>

                                    ): (
                                        <>
                                        </>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )
                    })
                ) : (
                    <>
                    </>
                )}
            </View>

        </View>
    )
}