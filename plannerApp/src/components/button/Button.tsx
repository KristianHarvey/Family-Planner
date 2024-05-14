import { PropsWithChildren } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { useColor } from "../../hooks/useColor";
import { Font, FontSize, Padding } from "../../constants/UIConstants";
import Ionicons from "react-native-vector-icons/Ionicons";

interface ButtonProps extends PropsWithChildren<TouchableOpacityProps> {
    title: string;
    color?: string;
}

export const Button: React.FC<ButtonProps> = ( {title, color, children, ...rest} ) => {
    const { colors } = useColor();
    return (
            <TouchableOpacity
            {...rest}
            style={{
                    height: 50,
                    backgroundColor: color ?? colors.background.contrast,
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 10, // Adjust horizontal margin
                    borderRadius: 5, // Adjust border radius
                    paddingHorizontal: Padding.XLarge * 2, // Adjust horizontal padding
            }}>

            
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                        style={{
                            color: colors.text.main,
                            fontSize: FontSize.Small, // Adjust font size
                            fontFamily: Font.TitilliumWebRegular,
                        }}
                    >
                        {title}
                    </Text>
                </View>
                {children}
            </TouchableOpacity>
    );
};