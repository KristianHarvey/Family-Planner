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
            position: "relative",
            width: '100%',
            height: 100,
            backgroundColor: colors.background.main,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: Padding.Medium

        }} {...rest}>
            <View style={{ 
                position: "relative",
                top: 15,
                height: "50%",
                width: "100%",
                display: "flex", 
                flexDirection: "row", 
                backgroundColor: colors.navbar.main,
            }}
            
            >
                {children}
            </View>
        </View>
    )
}

export default BarContainer;