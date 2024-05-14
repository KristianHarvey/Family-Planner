import { Pressable, Text, View } from "react-native"
import { WidgetBase } from "../../widgetBase/WidgetBase"
import { ShoppingList } from "../../../../models/shoppingList"
import React from "react";
import { useNavigate } from "../../../../hooks/useNavigation";
import { useColor } from "../../../../hooks/useColor";
import { Font, FontSize } from "../../../../constants/UIConstants";
import Feather from "react-native-vector-icons/Feather";
import { ShoppingListWidgetBase } from "./ShoppingListWidgetBase";

interface Props {
    shoppingList?: ShoppingList;
    onPress?: (shoppingList: ShoppingList) => void;
}

export const ShoppingListWidget: React.FC<Props> = ({shoppingList, onPress}) => {
    const navigate = useNavigate();
    const { colors } = useColor();
    if(!shoppingList) {
        return;
    }
    const handleNavigateToShoppingList = (shoppingList) => {
        navigate.navigate('ShoppingListView', {shoppingList});
    }
    return (
        <ShoppingListWidgetBase
        sideMargins
        shoppingList={shoppingList}
        pressable
        onPress={onPress}>
            <Feather
                name={"chevron-right"}
                size={50}
                color={colors.text_main}/>
        </ShoppingListWidgetBase>
    )
}