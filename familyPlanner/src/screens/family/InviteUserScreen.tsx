import { useRoute } from "@react-navigation/native"
import { SafeAreaView, View } from "react-native";
import { SearchUserInput } from "../../components/search/SearchUserInput";
import { useColor } from "../../hooks/useColor";
import { TopBar } from "../../components/topBar/TopBar";
import { Padding } from "../../constants/UIConstants";

interface InviteScreenProps {
    familyId: number;
}

export const InviteUserScreen = () => {
    const route = useRoute();
    const { familyId } = route.params as InviteScreenProps;
    const { colors } = useColor();
    console.log(familyId);

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background.main
        }}>
            <TopBar cameFromScreen="Profile" leftIcon='arrow-back' middleText="Inviter"/>
            <View
            style={{
                marginTop: Padding.Large
            }}>
                <SearchUserInput familyId={familyId}/>
            </View>
        </SafeAreaView>
    )
}