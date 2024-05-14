import { SafeAreaView, View } from "react-native"
import { useColor } from "../../../hooks/useColor"
import { TopBar } from "../../../components/topBar/TopBar";
import { ProfileBase } from "../../../components/profile/profileBase/ProfileBase";

export const EditProfileScreen = () => {
    const { colors } = useColor();
    return (
        <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: colors.background.main,
        }}>
            <TopBar leftIcon='arrow-back' cameFromScreen="ProfileSetting" middleText="Rediger Profil"/>
            <ProfileBase canUploadPicture={true}/>
        </SafeAreaView>
    )
}