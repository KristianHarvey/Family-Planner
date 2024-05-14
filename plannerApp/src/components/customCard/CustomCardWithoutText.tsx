
import React, { PropsWithChildren } from "react";
import { Dimensions, Text, View, ViewProps } from "react-native";
import { useColor } from "../../hooks/useColor";
import { Font, FontSize, Padding } from "../../constants/UIConstants";
import { ScrollView } from "react-native-gesture-handler";

interface CustomCardProps extends PropsWithChildren<ViewProps> {
    text?: string;
    highlightText?: string;
    color?: string;
};

export const CustomCardWithoutText: React.FC<CustomCardProps> = ({color, text, highlightText, children, ...rest}) => {
    const { colors } = useColor();

    const cardWidth = Dimensions.get('window').width - 2 * Padding.Large; // Adjust padding as needed
    return (
        <View {...rest} style={{ backgroundColor: color ? color : colors.textCard.main, padding: Padding.Large, margin: Padding.Medium, borderRadius: Padding.Large}}>
                {children}
        </View>
    );
};