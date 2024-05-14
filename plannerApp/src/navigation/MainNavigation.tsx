import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import BottomBar from '../components/bottomBar/BottomBar';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import CreateScreen from '../screens/PlanningSreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlanScreen } from '../screens/PlanScreen';
import { NavigationContainer } from '@react-navigation/native';
import PlanningScreen from '../screens/PlanningSreen';
import { PlannedTaskCreationScreen } from '../screens/PlannedTaskCreationScreen';
import { StartupScreen } from '../screens/StartupScreen';
import { CreateFamilyScreen } from '../screens/family/CreateFamilyScreen';
import { InviteUserScreen } from '../screens/family/InviteUserScreen';
import { ProfileSettingsScreen } from '../screens/profile/ProfileSettingsScreen';
import { EditProfileScreen } from '../screens/profile/settingsScreens/EditProfileScreen';

const Stack = createNativeStackNavigator();

const tab = createBottomTabNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Startup' component={StartupScreen}/>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
            <Stack.Screen name='Plan' component={PlanScreen}/>
        </Stack.Navigator>
    )
}

const MainTabs = () => {
    const auth = useAuth();
    return (
            <tab.Navigator screenOptions={{headerShown: false}} tabBar={props => <BottomBar {...props}/>}>
                <tab.Screen name='Home' component={HomeScreen}/>
                <tab.Screen name='Calendar' component={CalendarScreen}/>
                <tab.Screen name='ShoppingList' component={ShoppingListScreen}/>
                <tab.Screen name='Profile' component={ProfileScreen}/>
                <tab.Screen name='ProfileSetting' component={ProfileSettingsScreen}/>
                <tab.Screen name='EditProfile' component={EditProfileScreen}/>
                <tab.Screen name='Create' component={PlanningScreen}/>
                <tab.Screen name='InviteUser' component={InviteUserScreen}/>
                <tab.Screen name='Plan' component={PlanScreen}/>
                <tab.Screen name='PlanCreation' component={PlannedTaskCreationScreen}/>
                <tab.Screen name='CreateFamily' component={CreateFamilyScreen}/>
            </tab.Navigator>
    )
}
const MainStack = createNativeStackNavigator();
const MainScreens = () => {
    const auth = useAuth();
    return (
        <MainStack.Navigator screenOptions={{headerShown: false}}>
          {auth?.isAuthenticated ? (
            <>
              <MainStack.Screen name='MainTabs' component={MainTabs} />
            </>
          ) : (
            <MainStack.Screen name='AuthStack' component={AuthStack} />
          )}
        </MainStack.Navigator>
      );
}
const MainNavigation = () => {
    const auth = useAuth();
    return <MainScreens/>
}
export default MainNavigation;