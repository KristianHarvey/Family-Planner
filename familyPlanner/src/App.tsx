import 'react-native-vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CalendarScreen from './screens/CalendarScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomBar from './components/bottomBar/BottomBar';
import MainNavigation from './navigation/MainNavigation';
import { AuthContextProvider } from './context/AuthContextProvider';
import { CalendarProvider } from 'react-native-calendars';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <GestureHandlerRootView>
                <NavigationContainer>
                    <AuthContextProvider>
                        <MainNavigation/>
                    </AuthContextProvider>
                </NavigationContainer>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}