import React, { PropsWithChildren } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { useColor } from "../../../hooks/useColor";

interface Props extends PropsWithChildren {
    canUploadPicture?: boolean;
    containerStyle?: StyleProp<ViewStyle>; // Additional style prop for the container
}

export const RoundProfilePictureContainer: React.FC<Props> = ({canUploadPicture, children, containerStyle, ...rest}) => {
    const { colors } = useColor();
    return (
        <View
        {...rest}>
            <View
            style={[{
                width: 150,
                height: 150,
                borderRadius: 150 / 2,
                
            }, containerStyle]} {...rest}>
                {canUploadPicture ? (
                    <TouchableOpacity>
                        {children}
                    </TouchableOpacity>
                ): (
                    <View>
                        {children}
                    </View>
                )}
            </View>
        </View>
    )
}