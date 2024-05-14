import React, { PropsWithChildren } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { useColor } from "../../../hooks/useColor";
import { Padding } from "../../../constants/UIConstants";

interface Props extends PropsWithChildren {
    backgroundColor?: string;
    style?: StyleProp<ViewStyle>;
    pressable?: boolean;
    onPress?: () => void;
    sideMargins?: boolean;
    familyType?: boolean;
    familyColor?: string;
}

export const WidgetBase: React.FC<Props> = ({
    backgroundColor, 
    style, 
    children, 
    pressable, 
    onPress,
    sideMargins,
    familyType,
    familyColor
}) => {
    const { colors } = useColor();
    return (
        <View>
            
            {pressable ? (
                <>
                <TouchableOpacity
                style={[{
                    backgroundColor: backgroundColor ? backgroundColor : colors.widget_background,
                    paddingHorizontal: Padding.Large,
                    paddingVertical: Padding.XLarge,
                    marginLeft: sideMargins ? Padding.Medium : 0,
                    marginRight: sideMargins ? Padding.Medium : 0,
                    margin: Padding.Small,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.4,
                    shadowOffset: {width: 1, height: 0},
                    shadowRadius: 2,
                    elevation: 5,
                    borderBottomWidth: familyType ? 5 : 0,
                    borderBottomColor: familyType ? familyColor : 'transparent'
                }, style]}
                onPress={onPress}>
                    {children}
                </TouchableOpacity>
                </>
            ) : (
                <>
                <View
                style={[{
                    backgroundColor: backgroundColor ? backgroundColor : colors.widget_background,
                    paddingHorizontal: Padding.Large,
                    paddingVertical: Padding.XLarge,
                    marginLeft: sideMargins ? Padding.Medium : 0,
                    marginRight: sideMargins ? Padding.Medium : 0,
                    margin: Padding.Small,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.4,
                    shadowOffset: {width: 1, height: 0},
                    shadowRadius: 2,
                    elevation: 5,
                    borderBottomWidth: familyType ? 5 : 0,
                    borderBottomColor: familyType ? familyColor : 'transparent'

                }, style]}>
                    {children}
                </View>
                </>
            )}
        </View>
    )
}