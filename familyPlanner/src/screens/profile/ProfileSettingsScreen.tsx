import Feather from "react-native-vector-icons/Feather";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useColor } from "../../hooks/useColor";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { TopBar } from "../../components/common/topBar/TopBar";
import { SettingsCard } from "../../components/profile/settingsCard/SettingsCard";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "../../hooks/useNavigation";

interface SettingNames {
    [key: string]: JSX.Element;
}

interface OnPressSettingNames {
    [key: string]: () => void;
}

export const ProfileSettingsScreen = () => {
    const { colors } = useColor();
    const auth = useAuth();
    const navigate = useNavigate();
    const settingNames: SettingNames = {
        "Rediger Profil": <Feather style={{marginRight: 4}} name="edit" size={26} color={colors.text.main}/>,
        "Rediger Familier": <IonIcons style={{marginRight: 4}} name="people-outline" size={26} color={colors.text.main}/>,
        "Log ut": <IonIcons name="exit-outline" size={30} color={colors.text.main}/>,
    }
    const onPressSettingNames: OnPressSettingNames = {
        "Rediger Profil": () => handleEditProfile(),
        "Rediger Familier": () => handleEditFamilies(),
        "Log ut": () => handleLogOut()
    }

    const settingItems = Object.keys(settingNames).map((name, index) => ({
        name: name,
        icon: settingNames[name],
        index: index.toString(),
        onPress: onPressSettingNames[name]
    }));
    const handleEditProfile = () => {
        navigate.navigate("EditProfile");
    }
    const handleEditFamilies = () => {
        navigate.navigate("EditFamilies");
    }
    const handleLogOut = async() => {
        await auth?.logout();
    }
    return (
        <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: colors.background.main
        }}>
            <ScrollView
            style={{
                flex: 1,
                backgroundColor: colors.background.main
            }}>
                <TopBar cameFromScreen="Profile" middleText="Innstillinger" leftIcon='arrow-back'/>
                {settingItems.map((setting, index) => (
                    <SettingsCard key={index} onPress={setting.onPress} text={setting.name} icon={setting.icon}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}