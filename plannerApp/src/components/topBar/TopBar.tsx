import { Dimensions, Text, TouchableOpacity, View } from "react-native"
import { Font, FontSize, Padding } from "../../constants/UIConstants"
import Ionicons from "react-native-vector-icons/Ionicons";
import { useColor } from "../../hooks/useColor";
import { useNavigate } from "../../hooks/useNavigation";

interface TopBarProps {
    toScreen?: string;
    cameFromScreen?: string;
    leftIcon?: any;
    leftText?: string;
    leftTextColor?: string;
    rightIcon?: any;
    rightText?: string;
    rightTextColor?: string;
    middleText?: string;
    onRightComponentClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
    toScreen, 
    cameFromScreen, 
    leftIcon, 
    leftText, 
    leftTextColor, 
    rightIcon, 
    rightText, 
    rightTextColor,
    onRightComponentClick,
    middleText
}) => {
    const { colors } = useColor();
    const navigate = useNavigate();
    const screenWidth = Dimensions.get('screen').width;
    const componentWidth = screenWidth / 5;

    const navigateBack = () => {
        if(cameFromScreen) {
            navigate.navigate(cameFromScreen);
        }
    }
    const renderLeftComponent = () => {
        if(leftIcon) {
            return (
                <Ionicons
                name={leftIcon}
                color={colors.text.main}
                size={FontSize.Large}
                onPress={navigateBack}/>
            )
        } else if(leftText) {
            return (
                <Text
                onPress={navigateBack}
                style={{
                    color: leftTextColor,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium
                }}>
                    {leftText}
                </Text>
            )
        }
    }
    const renderRightComponent = () => {
        if(rightIcon) {
            return (
                <Ionicons
                name={rightIcon}
                color={colors.text.main}
                size={FontSize.Large}
                onPress={onRightComponentClick}/>
            )
        } else if(rightText) {
            return (
                <Text
                onPress={onRightComponentClick}
                style={{
                    color: rightTextColor,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Small
                }}>
                    {rightText}
                </Text>
            )
        }
    }
    //<Ionicons name='arrow-back' color={colors.text.main} onPress={navigateBack} size={30} ></Ionicons>
    return (
        <View style={{ width: '100%', flexShrink: 1}}>
            <View
            style={{
                flexDirection: 'row', 
                width: '100%',
                marginTop: Padding.XLarge,
                marginBottom: Padding.Large,
            }}>
                <View
                style={{
                    justifyContent: 'center',
                    width: componentWidth,
                    marginLeft: Padding.Large
                }}>
                    {renderLeftComponent()}
                </View>
                <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: componentWidth * 2
                }}>
                    <Text
                    style={{
                        color: colors.text.main, 
                        fontSize: 22
                    }}>
                        {middleText}
                    </Text>
                </View>
                <View
                style={{
                    width: componentWidth,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginRight: Padding.Large
                }}>
                    {renderRightComponent()}
                </View>
            </View>
        </View>
    )
}