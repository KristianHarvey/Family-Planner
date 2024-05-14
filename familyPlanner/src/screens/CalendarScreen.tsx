import { TouchableOpacity, View, Text, SafeAreaView } from "react-native"
import { useColor } from "../hooks/useColor"
import { TopBar } from "../components/topBar/TopBar";

const CalendarScreen = () => {
    const { colors } = useColor();
    return (
        <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: colors.background.main
        }}>
            <TouchableOpacity style={{flex: 1, backgroundColor: colors.background.main}}>
                <TopBar/>
                <Text style={{color: colors.text.main}}>Calendar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default CalendarScreen;