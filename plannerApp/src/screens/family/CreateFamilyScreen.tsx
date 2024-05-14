import React from "react"
import { TextInput, View } from "react-native"
import { User } from "../../models/user";
import { useColor } from "../../hooks/useColor";
import { TopBar } from "../../components/topBar/TopBar";
import { Padding } from "../../constants/UIConstants";
import { SearchUserInput } from "../../components/search/SearchUserInput";
import { Button } from "../../components/button/Button";
import { FamilyService } from "../../api/services/familyService";
import { Family } from "../../models/family";
import { useNavigate } from "../../hooks/useNavigation";

export const CreateFamilyScreen = () => {
    const [name, setName] = React.useState('');
    const [members, setMembers] = React.useState<User[]>([]);
    // const [familyId, setFamilyId] = React.useState<number>(0);
    const navigate = useNavigate();

    const { colors } = useColor();

    const handleCreateNewFamily = async() => {
        const response = await FamilyService.createNew({
            name: name,
        });
        if(response) {
            const family: Family = response.data;
            console.log(family);
            const familyId = family.id;
            navigate.navigate('InviteUser', { familyId });
        }
    }

    return (
        <View
        style={{flex: 1, backgroundColor: colors.background.main}}>
            <TopBar leftIcon="arrow-back" middleText="Lag ny familie" cameFromScreen="Profile"/>
            <View
            style={{
                padding: Padding.Medium,
            }}>
                <TextInput
                style={{
                    backgroundColor: colors.textCard.main,
                    borderRadius: 5
                }}
                placeholder="Familienavn"
                value={name}
                onChangeText={setName}
                />
                <Button title="Lag" onPress={handleCreateNewFamily}/>
            </View>
        </View>
    )
}