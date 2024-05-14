import React, { PropsWithChildren } from "react";
import { ShoppingListItem } from "../../../../models/shoppingList"
import { WidgetBase } from "../../widgetBase/WidgetBase";
import { ShoppingListItemWidget } from "./ShoppingListItemWidget";
import { Image, Pressable, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useColor } from "../../../../hooks/useColor";
import { Font, FontSize, Padding } from "../../../../constants/UIConstants";
import Feather from "react-native-vector-icons/Feather";

interface Props extends PropsWithChildren {
    item?: ShoppingListItem;
    style?: StyleProp<ViewStyle>;
}

export const ShoppingListItemEditWidget: React.FC<Props> = ({item, style, children}) => {
    const { colors } = useColor();
    const defaultImage = require('../../../../../assets/images/DefaultProfileImage.jpg');

    return (
        <WidgetBase
        sideMargins>
            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <View
                style={[{
                    flexDirection: 'row',
                }, style]}>
                    <Image style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50 / 2,
                        marginRight: Padding.Medium,
                    }} source={item.image ? {uri: item.image} : defaultImage}/>
                    <View
                    style={{

                    }}>
                        <Text 
                        style={{ 
                            marginLeft: Padding.Medium, 
                            color: colors.text.main,
                            fontFamily: Font.TitilliumWebRegular,
                            fontSize: FontSize.Medium
                        }}>{item.name}</Text>
                        <Text
                        style={{
                            color: colors.text.main,
                            marginLeft: Padding.Medium,
                            fontFamily: Font.TitilliumWebRegular,
                            fontSize: FontSize.Small
                        }}>{item.currentPrice}kr</Text>
                    </View>
                </View>
                {children}
            </View>
        </WidgetBase>
    )
}