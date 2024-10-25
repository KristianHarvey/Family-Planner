import { useRoute } from "@react-navigation/native"
import { SafeAreaView, View } from "react-native";
import { SearchUserInput } from "../../components/common/search/SearchUserInput";
import { useColor } from "../../hooks/useColor";
import { TopBar } from "../../components/common/topBar/TopBar";
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
            backgroundColor: colors.widget_background
        }}>
            <SearchUserInput familyId={familyId}/>
        </SafeAreaView>
    )
}