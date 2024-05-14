import React from "react";
import { Text, View } from "react-native"
import { useColor } from "../../../hooks/useColor";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";

interface Props {
    text: string;
}

export const SplitItemTextView: React.FC<Props> = ({text}) => {
    const { colors } = useColor();
    return (
        <View>
            <View style={{ padding: Padding.Medium }}/>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Left border */}
                <View style={{ flex: 1, borderBottomWidth: 0.4, borderBottomColor: colors.text_silver }} />
                {/* Text */}
                <Text style={{ 
                    marginHorizontal: Padding.Large,
                    color: colors.text_silver,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.XSmall,
                }}>{text}</Text>
                
                {/* Right border */}
                <View style={{ flex: 1, borderBottomWidth: 0.4, borderBottomColor: colors.text_silver }} />
            </View>
            <View style={{ padding: Padding.Medium }}/>
        </View>
    )
}