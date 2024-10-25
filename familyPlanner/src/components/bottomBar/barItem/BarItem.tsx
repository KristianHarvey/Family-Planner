import React from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { Padding } from "../../../constants/UIConstants";
import { Link, NavigationAction, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useColor } from "../../../hooks/useColor";
import { RoundProfilePictureContainer } from "../../profile/roundProfilePicture/RoundProfilepictureContainer";
import { User } from "../../../models/user";

interface BarItemProps {
    totalItems: number;
    iconName?: string;
    iconSize?: number;
    iconComponent?: React.ComponentType<{name: string, size: number, color: string}>;
    reverse?: boolean;
    navigateScreen?: string;
    color?: string;
    selected?: boolean;
    onPress?: () => void;
    type?: string;
    currentUser?: User;
    defaultImage?: any;
}

const BarItem: React.FC<BarItemProps> = ( {totalItems, type, iconName, currentUser, defaultImage, iconComponent: IconComponent, iconSize, navigateScreen, color, selected = false} ) => {
    const barWidth = Dimensions.get('window').width;
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [shouldReload, setShouldReload] = React.useState(false);
    const isImage = type === 'image';
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
        {isImage ? (
            <TouchableOpacity style={{
                flex: 1,
                width: barWidth / (totalItems * 2),
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }} onPress={handleNavigation}>
                    <Image style={{
                        width: 35,
                        height: 35,
                        borderRadius: 35 / 2,
                        borderWidth: selected ? 1 : 0,
                        borderColor: selected ? colors.navbar.icons : 'transparent',
                    }} source={currentUser && currentUser.profileImage ? {uri: currentUser.profileImage.uri} : defaultImage} />
            </TouchableOpacity>
        ): (
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

        )}

        </>
    );
};

export default BarItem;