import React, { Children, PropsWithChildren } from "react"
import { View } from "react-native"
import { useColor } from "../../../hooks/useColor";

interface BarContainerProps extends PropsWithChildren {
}

const BarContainer: React.FC<BarContainerProps> = ( {children, ...rest }) => {
    const { colors } = useColor();
    return (
        <View
        style={{
            bottom: 0,
            width: '100%',
            height: 50,
            backgroundColor: colors.background.tertiary,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }} {...rest}>
            {children}
        </View>
    )
}

export default BarContainer;