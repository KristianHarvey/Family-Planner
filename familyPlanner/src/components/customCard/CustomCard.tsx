import { PropsWithChildren } from "react";
import { Dimensions, Text, View, ViewProps } from "react-native";
import { useColor } from "../../hooks/useColor";
import { Font, FontSize, Padding } from "../../constants/UIConstants";
import { ScrollView } from "react-native-gesture-handler";

interface CustomCardProps extends PropsWithChildren<ViewProps> {
    text?: string;
    highlightText?: string;
}

export const CustomCard: React.FC<CustomCardProps> = ({text, highlightText, children}) => {
    const { colors } = useColor();
    const cardWidth = Dimensions.get('window').width - 2 * Padding.Large; // Adjust padding as needed
    return (
        <View style={{ backgroundColor: colors.textCard.main, margin: Padding.Large, borderRadius: Padding.Large}}>
                <View style={{ flexDirection: "row", padding: Padding.Large, }}>
                    <Text 
                    style={{ 
                        color: colors.text.main, 
                        fontFamily: Font.TitilliumWebRegular, 
                        fontSize: FontSize.Medium
                    }}>
                        {text}
                    </Text>
                    <Text style={{
                        marginLeft: Padding.Small,
                        color: colors.text.secondary,
                        fontFamily: Font.TitilliumWebRegular, 
                        fontSize: FontSize.Medium 
                    }}>
                        {highlightText}
                    </Text>
                </View>
                {children}
        </View>
    )
}