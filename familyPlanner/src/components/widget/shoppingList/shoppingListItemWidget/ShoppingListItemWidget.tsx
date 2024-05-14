import { Image, Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import { useColor } from "../../../../hooks/useColor";
import { ShoppingListItem } from "../../../../models/shoppingList"
import { WidgetBase } from "../../widgetBase/WidgetBase";
import { Font, FontSize, Padding } from "../../../../constants/UIConstants";
import { PropsWithChildren } from "react";
import Feather from "react-native-vector-icons/Feather";
import IonIcons from "react-native-vector-icons/Ionicons";

interface Props extends PropsWithChildren {
    item?: ShoppingListItem;
    style?: StyleProp<ViewStyle>;
}

export const ShoppingListItemWidget: React.FC<Props> = ({item, style, children}) => {
    const { colors } = useColor();
    const defaultImage = require('../../../../../assets/images/DefaultProfileImage.jpg');
    if(!item) {
        return;
    }
    return (
        <WidgetBase
        sideMargins>
            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
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
                <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text
                    style={{
                        color: colors.accent_spring,
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Medium,
                        marginRight: Padding.Large,
                    }}>{item.quantity} stk</Text>
                    <View
                    style={{
                        flexDirection: 'column',
                    }}>
                        <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: colors.text_main,
                        }}>
                            <Feather
                            name={'check'}
                            color={'green'}
                            size={30}/>
                        </View>
                        <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: colors.text_main,
                        }}>
                            <IonIcons
                            name={'close'}
                            color={'red'}
                            size={30}/>
                        </View>
                    </View>
                </View>
            </View>
        </WidgetBase>
    )
}