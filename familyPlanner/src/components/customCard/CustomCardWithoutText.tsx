
import React, { PropsWithChildren } from "react";
import { Dimensions, StyleProp, Text, TouchableOpacity, View, ViewProps, ViewStyle } from "react-native";
import { useColor } from "../../hooks/useColor";
import { Font, FontSize, Padding } from "../../constants/UIConstants";
import { ScrollView } from "react-native-gesture-handler";

interface CustomCardProps extends PropsWithChildren<ViewProps> {
    text?: string;
    highlightText?: string;
    color?: string;
    style?: StyleProp<ViewStyle>;
    touchable?: boolean;
    onPress?: () => void;
};

export const CustomCardWithoutText: React.FC<CustomCardProps> = ({color, style, onPress, touchable, text, highlightText, children, ...rest}) => {
    const { colors } = useColor();

    const cardWidth = Dimensions.get('window').width - 2 * Padding.Large; // Adjust padding as needed
    return (
        <View>
            {touchable ? (
                <TouchableOpacity {...rest} onPress={onPress} style={[{ backgroundColor: color ? color : colors.widget_background, padding: Padding.Small, marginRight: Padding.Medium, marginLeft: Padding.Medium, margin: Padding.Small, borderRadius: 5}, style]}>
                    {children}
                </TouchableOpacity>
            ): (
                <View {...rest} style={[{ backgroundColor: color ? color : colors.widget_background, padding: Padding.Small, marginRight: Padding.Medium, marginLeft: Padding.Medium, margin: Padding.Small, borderRadius: 5}, style]}>
                    {children}
                </View>
            )}
        </View>
    );
};