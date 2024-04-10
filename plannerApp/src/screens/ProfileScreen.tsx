import { Button, Text, TouchableOpacity } from "react-native"
import { useColor } from "../hooks/useColor";
import { useAuth } from "../hooks/useAuth";

const ProfileScreen = () => {
    const { colors } = useColor();
    const auth = useAuth();

    const handleLogout = async() => {
        await auth?.logout();
    }

    return (
        <TouchableOpacity style={{flex: 1, backgroundColor: colors.background.main}}>
            <Text style={{color: colors.text.main}}>Profile</Text>
            <TouchableOpacity>
                <Button onPress={handleLogout} title="logout"/>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default ProfileScreen;