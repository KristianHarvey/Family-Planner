import { Dimensions, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useColor } from "../hooks/useColor";
import { useNavigate } from "../hooks/useNavigation";
import { Font, FontSize, Padding } from "../constants/UIConstants";
import { TopBar } from "../components/common/topBar/TopBar";

export const StartupScreen = () => {
    const { colors } = useColor();
    const auth = useAuth();
    const navigation = useNavigate();
    const screenHeight = Dimensions.get('screen').height;

    const handleLoginNavigation = () => {
        navigation.navigate('Login');
    }
    const handleRegisterNavigation = () => {
        navigation.navigate("Register");
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background.main}}>
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: screenHeight / 3,
            }}>
                <Text style={{fontSize: FontSize.XLarge, color: colors.text.main}}>Familie</Text>
                <Text style={{
                    fontSize: FontSize.Large, color: colors.text.main
                }}>Planlegger</Text>
            </View>
            <View style={{
                bottom: screenHeight / 8,
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: "center",
            }}>
                <TouchableOpacity 
                onPress={handleLoginNavigation}
                style={{
                    marginTop: Padding.XLarge,
                    width: '90%',
                    borderRadius: Padding.Small,
                    backgroundColor: colors.text.secondary, 
                    padding: Padding.Large}}>
                    <Text style={{
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Small,
                        color: colors.text.main,
                        textAlign: 'center'
                    }}>Login med email</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={handleRegisterNavigation}
                style={{ 
                    marginTop: Padding.XLarge,
                    width: '90%',
                    borderRadius: Padding.Small,
                    backgroundColor: colors.text.secondary, 
                    padding: Padding.Large}}>
                    <Text style={{
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Small,
                        color: colors.text.main,
                        textAlign: 'center'
                    }}>Opprett bruker med email</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}