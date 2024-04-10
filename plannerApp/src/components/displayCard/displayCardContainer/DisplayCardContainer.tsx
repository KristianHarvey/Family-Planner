import { PropsWithChildren } from "react";
import { View } from "react-native";
import { useColor } from "../../../hooks/useColor";
import { Padding } from "../../../constants/UIConstants";

interface DisplayCardProps extends PropsWithChildren {
};

const DisplayCardContainer: React.FC<DisplayCardProps> = ({children}) => {
    const { colors } = useColor();
    return (
        <View 
        style={{
            display: "flex", 
            backgroundColor: colors.textCard.main,
            margin: Padding.Medium,
            borderRadius: 15
        }}>
            {/* <View
            style={{
                backgroundColor: 'transparent',
                borderTopWidth: 2,
                borderColor: colors.text.main,
                top: 8,
                width: 30
            }}>
            </View> */}
                {children}
        </View>
    );
};

export default DisplayCardContainer;