import React, { Children, PropsWithChildren } from "react"
import { Platform, View } from "react-native"
import { useColor } from "../../../hooks/useColor";
import { Padding } from "../../../constants/UIConstants";

interface BarContainerProps extends PropsWithChildren {
}

const BarContainer: React.FC<BarContainerProps> = ( {children, ...rest }) => {
    const { colors } = useColor();
    return (
        <View
        style={{
            bottom: 0,
            backgroundColor: colors.background.main,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }} {...rest}>
            <View style={{ 
                position: "relative",
                height: 75,
                width: "100%",
                display: "flex", 
                flexDirection: "row", 
                backgroundColor: colors.background.main,

            }}
            
            >
                {children}
            </View>
        </View>
    )
}

export default BarContainer;