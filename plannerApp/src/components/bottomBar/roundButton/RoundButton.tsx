import { Button, Text, TouchableOpacity, View } from "react-native"
import { useColor } from "../../../hooks/useColor";
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface RoundButtonProps {
    size: number;
    selected?: boolean;
    navigateScreen?: string;
}

const RoundButton: React.FC<RoundButtonProps> = ( {size, selected = false, navigateScreen, ...rest} ) => {
    const { colors } = useColor();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const handleNavigation = () => {
        if(navigateScreen) {
            navigation.navigate(navigateScreen);
        }
    }
    return (
        <View>
            <TouchableOpacity onPress={handleNavigation}>
                <View style={{
                    width: size,
                    height: size,
                    borderRadius: size/2,
                    borderWidth: 2,
                    backgroundColor: colors.text.secondary,
                    borderColor: selected ? colors.text.main : 'transparent',
                    justifyContent: 'center',
                }}
                {...rest}>
                    
                    <Icon
                    name="plus"
                    type='antdesign'
                    size={50}
                    color={colors.text.main}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default RoundButton;