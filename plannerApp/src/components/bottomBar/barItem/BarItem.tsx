import { Dimensions, TouchableOpacity, View } from "react-native";
import { Padding } from "../../../constants/UIConstants";
import { Link, NavigationAction, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useColor } from "../../../hooks/useColor";

interface BarItemProps {
    totalItems: number;
    iconName: string;
    iconSize: number;
    iconComponent: React.ComponentType<{name: string, size: number, color: string}>;
    reverse?: boolean;
    navigateScreen?: string;
    color: string;
    selected: boolean;
    onPress?: () => void;
}

const BarItem: React.FC<BarItemProps> = ( {totalItems, iconName, iconComponent: IconComponent, iconSize, navigateScreen, color, selected = false} ) => {
    const barWidth = Dimensions.get('window').width;
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const { colors } = useColor();

    const handleNavigation = () => {
        if(navigateScreen) {
            navigation.navigate(navigateScreen);
        } else {
            console.log("Navigation is undefined");
        }
    }
    
    return (
        <>
            <TouchableOpacity style={{
                flex: 1,
                width: barWidth / (totalItems * 2),
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: selected ? colors.navbar.icons : 'transparent',
            }} onPress={handleNavigation}>

                <IconComponent name={iconName} size={iconSize as number} color={color}/>
        </TouchableOpacity>

        </>
    );
};

export default BarItem;