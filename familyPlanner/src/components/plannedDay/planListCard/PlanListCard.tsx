import { Text, TouchableOpacity, View } from "react-native";
import { useColor } from "../../../hooks/useColor";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";
import { format } from "date-fns";
import { DayKeyUtils } from "../../../utils/DayKeyUtils";
import { useNavigate } from "../../../hooks/useNavigation";
import { PlannedTask } from "../../../models/plannedTask";
import { PlannedDay } from "../../../models/plannedDay";
import { WidgetBase } from "../../widget/widgetBase/WidgetBase";
import { ShoppingListItemView } from "../../shoppingList/shoppingListItemView/ShoppingListItemView";
import { ShoppingListItemWidget } from "../../widget/shoppingList/shoppingListItemWidget/ShoppingListItemWidget";
import { ShoppingListWidget } from "../../widget/shoppingList/shoppingListWidget/ShoppingListWidget";
import { ShoppingListWidgetBase } from "../../widget/shoppingList/shoppingListWidget/ShoppingListWidgetBase";
import { ShoppingList } from "../../../models/shoppingList";
import { SplitItemTextView } from "../../atoms/splitItemTextView/SplitItemTextView";

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

    const handleNavigateToShoppingList = (shoppingList: ShoppingList) => {
        const shoppingListId = shoppingList.id ?? 0;
        navigate.navigate("ShoppingListView", {shoppingListId, cameFrom: "Planning"});
    }


    return (
        <View style={{
            marginTop: Padding.Small,
        }}>
            <View style={{
                display: "flex",
            }}>
            {plannedDay ? (
                <>
                    <SplitItemTextView text="Oppgaver"/>
                    {plannedDay.plannedTasks?.map((plannedtask, index) => (
                        <WidgetBase
                            key={index}
                            pressable
                            backgroundColor={colors.textCard.main}
                            onPress={() => handleNavigateToTask(plannedtask.id)}>
                            <View style={{marginLeft: Padding.Small}}>
                                <Text style={{color: colors.text.main}}>{plannedtask.name}</Text>
                            </View>
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <Text style={{color: colors.text.main}}>{plannedtask.description}</Text>
                                {plannedtask.status ? (
                                    <Text style={{color: colors.text.main}}>{plannedtask.status}</Text>
                                ) : (
                                    <></>
                                )}
                            </View>
                        </WidgetBase>
                    ))}
                    <SplitItemTextView text="Handlelister"/>
                    {plannedDay.shoppingLists && plannedDay.shoppingLists.map((shoppingList, index) => (
                        <ShoppingListWidgetBase
                        pressable
                        onPress={handleNavigateToShoppingList}
                        key={index} 
                        backgroundColor={colors.textCard.main}
                        shoppingList={shoppingList}/>
                    ))}
                    <SplitItemTextView text="Aktiviteter"/>
                    {plannedDay.shoppingLists && plannedDay.activities.map((activity, index) => (
                        <WidgetBase
                        key={index}
                        backgroundColor={colors.textCard.main}>
                            <Text
                            style={{
                                color: colors.text_main,
                                fontFamily: Font.TitilliumWebRegular,
                                fontSize: FontSize.Medium
                            }}>
                                {activity.name}
                            </Text>
                        </WidgetBase>
                    ))}
                    </>
                ) : (
                    <>
                    </>
                )}
            </View>

        </View>
    )
}