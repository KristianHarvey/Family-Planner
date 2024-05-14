import { Text, TouchableOpacity } from "react-native"
import { useColor } from "../hooks/useColor";
import { TopBar } from "../components/topBar/TopBar";

const ShoppingListScreen = () => {
    const { colors } = useColor();
    return (
        <TouchableOpacity style={{flex: 1, backgroundColor: colors.background.main}}>
            <TopBar/>
            <Text style={{color: colors.text.main}}>Shopping List</Text>
        </TouchableOpacity>
    );
};

export default ShoppingListScreen;