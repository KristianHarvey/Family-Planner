import { Text, TouchableOpacity } from "react-native"
import { useColor } from "../hooks/useColor";

const ShoppingListScreen = () => {
    const { colors } = useColor();
    return (
        <TouchableOpacity style={{flex: 1, backgroundColor: colors.background.main}}>
            <Text style={{color: colors.text.main}}>Shopping List</Text>
        </TouchableOpacity>
    );
};

export default ShoppingListScreen;