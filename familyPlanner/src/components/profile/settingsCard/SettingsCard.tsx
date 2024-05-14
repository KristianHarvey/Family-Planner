import { Text, TouchableOpacity, View } from "react-native";
import { useColor } from "../../../hooks/useColor";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";
import { useNavigate } from "../../../hooks/useNavigation";

interface Props {
    text?: string;
    icon?: any;
    onPress?: () => void;
}

export const SettingsCard: React.FC<Props> = ({text, icon, onPress}) => {
    const { colors } = useColor();
    const navigate = useNavigate();

    return (
        <TouchableOpacity
        style={{
            backgroundColor: colors.textCard.main,
            paddingHorizontal: Padding.XLarge,
            padding: Padding.XLarge * 1.5,
            borderRadius: 3,
            marginRight: Padding.Medium,
            marginLeft: Padding.Medium,
            margin: Padding.Small,
            borderWidth: 2,
            borderColor: colors.textCard.secondary,
        }}
        onPress={onPress}>
            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Text
                style={{
                    color: colors.text.main,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium
                
                }}>{text}</Text>
                {icon}
            </View>
        </TouchableOpacity>
    )
}