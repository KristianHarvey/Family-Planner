import { TouchableOpacity, View } from "react-native"
import { Text } from "react-native-elements"
import { useColor } from "../hooks/useColor"

const CalendarScreen = () => {
    const { colors } = useColor();
    return (
        <TouchableOpacity style={{flex: 1, backgroundColor: colors.background.main}}>
            <Text style={{color: colors.text.main}}>Calendar</Text>
        </TouchableOpacity>
    )
}
export default CalendarScreen;