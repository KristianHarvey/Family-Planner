import { View } from "react-native";
import BarContainer from "./barContainer/BarContainer"
import RoundButton from "./roundButton/RoundButton";
import BarItem from "./barItem/BarItem";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useColor } from "../../hooks/useColor";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";

interface BottomBarProps extends BottomTabBarProps {

}

const BottomBar: React.FC<BottomBarProps> = ({state}) => {
    const { colors } = useColor();
    const homeIcon = {
        name: 'home-outline', 
        size: 30,
        iconComponent: Ionicons,
        navigateScreen: "Home",
        color: colors.text.main,
        selectedIcon: {
            name: 'home-sharp',
            size: 30,
            iconComponent: Ionicons,
            navigateScreen: "Home",
            color: colors.text.main
        }
    };
    
    const userIcon = {
        name: 'user-o', 
        size: 30,
        iconComponent: FontAwesome,
        navigateScreen: "Profile",
        color: colors.text.main,
        selectedIcon: {
            name: 'user',
            size: 33,
            iconComponent: FontAwesome,
            navigateScreen: "Profile",
            color: colors.text.main
        }
    };

    const shoppingListIcon = {
        name: 'list-outline',
        size: 33,
        iconComponent: Ionicons,
        navigateScreen: "ShoppingList",
        color: colors.text.main,
        selectedIcon: {
            name: 'list-sharp',
            size: 33,
            iconComponent: Ionicons,
            navigateScreen: "ShoppingList",
            color: colors.text.main
        }
    }
    
    const calenderIcon = {
        name: 'calendar-clear-outline', 
        size: 30,
        iconComponent: Ionicons,
        navigateScreen: "Calendar",
        color: colors.text.main,
        selectedIcon: {
            name: 'calendar-clear',
            size: 30,
            iconComponent: Ionicons,
            navigateScreen: "Calendar",
            color: colors.text.main
        }
    };
    const bottomBarLeftItems = [homeIcon, calenderIcon];
    const bottomBarRightItems = [shoppingListIcon, userIcon];

    return (
        <>
            <BarContainer>
                {bottomBarLeftItems.map((item, index) => {
                    const isSelected = state.routes[state.index].name === item.navigateScreen;
                    const itemIcon = isSelected && item.selectedIcon ? item.selectedIcon : item;
                    return (
                    <BarItem 
                    key={index}
                    selected={isSelected} 
                    color={itemIcon.color} 
                    iconComponent={itemIcon.iconComponent as React.ComponentType<{name: string, size: number, color: string}>} 
                    totalItems={2} 
                    iconName={itemIcon.name} 
                    iconSize={itemIcon.size} 
                    navigateScreen={itemIcon.navigateScreen}/>
                )})}
                <View style={{
                    alignItems: 'center',
                    bottom: 25,
                    backgroundColor: 'none',
                }}>
                    <RoundButton navigateScreen="Create" selected={state.routes[state.index].name === "Create"} size={100}/>
                </View>
                {bottomBarRightItems.map((item, index) => {
                    const isSelected = state.routes[state.index].name === item.navigateScreen;
                    const itemIcon = isSelected && item.selectedIcon ? item.selectedIcon : item;

                    return (
                    <BarItem key={index}
                    selected={isSelected} 
                    color={itemIcon.color} 
                    iconComponent={itemIcon.iconComponent as React.ComponentType<{name: string, size: number, color: string}>} 
                    totalItems={2} 
                    iconName={itemIcon.name} 
                    iconSize={itemIcon.size}
                    navigateScreen={itemIcon.navigateScreen}/>
                )})}
            </BarContainer>
        </>
    );
};

export default BottomBar;