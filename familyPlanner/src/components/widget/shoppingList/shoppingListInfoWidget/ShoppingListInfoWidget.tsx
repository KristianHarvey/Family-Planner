import { Text, View } from "react-native";
import { useColor } from "../../../../hooks/useColor"
import { ShoppingList } from "../../../../models/shoppingList";
import { WidgetBase } from "../../widgetBase/WidgetBase";
import { Font, FontSize } from "../../../../constants/UIConstants";
import { DayKeyUtils } from "../../../../utils/DayKeyUtils";

interface Props {
    shoppingList?: ShoppingList;
}

export const ShoppingListInfoWidget: React.FC<Props> = ({shoppingList}) => {
    const { colors } = useColor();
    if(shoppingList.plannedDay) {
        console.log("Planned day: ", shoppingList.plannedDay.dayKey);
    }
    const date = shoppingList.plannedDay && DayKeyUtils.formatPretty(new Date(shoppingList.plannedDay.dayKey));
    return (
        <WidgetBase
        sideMargins>
            <View
            style={{
            }}>
                <Text
                style={{
                    color: colors.accent_spring,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium,
                }}>
                    {shoppingList.name}
                </Text>
                <Text
                style={{
                    color: colors.text_main,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Small
                }}>
                    {shoppingList.items.length} varer i handlelisten
                </Text>
                <Text
                style={{
                    color: colors.text_main,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Small,
                }}>
                </Text>
                {shoppingList.plannedDay && (
                    <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <Text
                    style={{
                        color: colors.text_main,
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Small,
                    }}>Planlagt til: </Text>
                    <Text
                    style={{
                        color: colors.accent_spring,
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Medium,
                    }}>
                        {date}
                    </Text>
                    </View>
                )}
            </View>
        </WidgetBase>
    )
}