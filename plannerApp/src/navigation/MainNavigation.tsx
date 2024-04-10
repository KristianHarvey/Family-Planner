import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import BottomBar from '../components/bottomBar/BottomBar';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateScreen from '../screens/CreateScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const tab = createBottomTabNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
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
            <tab.Screen name='Create' component={CreateScreen}/>
        </tab.Navigator>
    )
}
const MainNavigation = () => {
    const auth = useAuth();
    return auth?.isAuthenticated ? <MainTabs/> : <AuthStack/>
}
export default MainNavigation;