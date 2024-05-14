import { Pressable, Text, View } from "react-native"
import { WidgetBase } from "../../widgetBase/WidgetBase"
import { ShoppingList } from "../../../../models/shoppingList"
import React, { PropsWithChildren } from "react";
import { useNavigate } from "../../../../hooks/useNavigation";
import { useColor } from "../../../../hooks/useColor";
import { Font, FontSize } from "../../../../constants/UIConstants";
import Feather from "react-native-vector-icons/Feather";

interface Props extends PropsWithChildren {
    shoppingList?: ShoppingList;
    pressable?: boolean;
    onPress?: (shoppingList: ShoppingList) => void;
    backgroundColor?: string;
    sideMargins?: boolean;
}

export const ShoppingListWidgetBase: React.FC<Props> = ({
    shoppingList, 
    backgroundColor, 
    pressable, 
    onPress, 
    children,
    sideMargins
}) => {
    const navigate = useNavigate();
    const { colors } = useColor();
    if(!shoppingList) {
        return;
    }
    console.log(shoppingList.id);
    return (
        <WidgetBase 
        sideMargins={sideMargins}
        backgroundColor={backgroundColor}
        pressable={pressable}
        onPress={() => onPress(shoppingList)}>
            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <View>
                    <Text
                    style={{
                        color: colors.text_main,
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Medium
                    }}>{shoppingList.name}</Text>
                    <Text
                    style={{
                        color: colors.accent_spring,
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Small,
                        flexDirection: 'row',
                    }}>{shoppingList.items ? shoppingList.items.length : 0}<Text
                    style={{
                        color: colors.text_main
                    }}> Varer</Text></Text>
                </View>
                {children}
            </View>
        </WidgetBase>
    )
}