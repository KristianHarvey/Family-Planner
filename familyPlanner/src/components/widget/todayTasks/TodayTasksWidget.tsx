import React from "react";
import { PlannedDay } from "../../../models/plannedDay"
import { useColor } from "../../../hooks/useColor";
import { WidgetBase } from "../widgetBase/WidgetBase";
import { Text, View } from "react-native";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";
import { SplitItemTextView } from "../../atoms/splitItemTextView/SplitItemTextView";
import { ShoppingListWidget } from "../shoppingList/shoppingListWidget/ShoppingListWidget";
import { ShoppingListWidgetBase } from "../shoppingList/shoppingListWidget/ShoppingListWidgetBase";
import { PlanListCard } from "../../plannedDay/planListCard/PlanListCard";

interface Props {
    plannedDay?: PlannedDay;
}

export const TodayTasksWidget: React.FC<Props> = ({plannedDay}) => {
    const { colors } = useColor();
    const [sortingList, setSortingList] = React.useState<any>([]);

    return (
        <WidgetBase
        sideMargins>
            <Text
            style={{
                color: colors.text_main,
                fontFamily: Font.TitilliumWebRegular,
                fontSize: FontSize.Medium,
            }}>
                Dagens planer
            </Text>
            {plannedDay ? (
                <>
                <View style={{ padding: Padding.Medium }}/>
                {plannedDay.plannedTasks.length > 0 && (
                    <>
                    <SplitItemTextView text="Oppgaver"/>
                    {plannedDay.plannedTasks.map((task, index) => (
                        <WidgetBase
                        key={index}
                        backgroundColor={colors.textCard.main}>
                            <Text
                            style={{
                                color: colors.text_main,
                                fontFamily: Font.TitilliumWebRegular,
                                fontSize: FontSize.Small
                            }}>{task.name}</Text>
                        </WidgetBase>
                    ))}
                    </>
                )}
                {plannedDay.shoppingLists.length > 0 && (
                    <>
                    <SplitItemTextView text="Handlelister"/>
                    {plannedDay.shoppingLists.map((shoppingList, index) => (
                        <ShoppingListWidgetBase backgroundColor={colors.textCard.main} key={index} shoppingList={shoppingList}/>
    
                    ))}
                    </>
                )}
                {plannedDay.activities.length > 0 && (
                    <>
                    <SplitItemTextView text="Aktiviteter"/>
                    {plannedDay.activities.map((activity, index) => (
                        <WidgetBase
                        key={index}
                        backgroundColor={colors.textCard.main}>
                            <Text
                            style={{
                                color: colors.text_main,
                                fontFamily: Font.TitilliumWebRegular,
                                fontSize: FontSize.Small
                            }}>{activity.name}</Text>
                        </WidgetBase>
                    ))}
                    </>
                )}

            </>
            ) : (
                <>
                    <View style={{ padding: Padding.Medium }}/>
                    <Text
                    style={{
                        color: colors.text_main,
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Small
                    }}>
                        Ingen planer for i dag.
                    </Text>
                </>
            )}
        </WidgetBase>
    )
}