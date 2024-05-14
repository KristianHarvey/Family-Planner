import React from "react"
import { UserService } from "../../api/services/userService";
import { FlatList, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useColor } from "../../hooks/useColor";
import { Font, FontSize, Padding } from "../../constants/UIConstants";
import { User } from "../../models/user";
import SelectDropdown from "react-native-select-dropdown";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "../../hooks/useNavigation";

interface Props {
    onSearchResultChange?: (result: any) => void;
    familyId: number;
}

export const SearchUserInput: React.FC<Props> = ({onSearchResultChange, familyId}) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<User[]>([]);
    const [foundUser, setFoundUser] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const { colors } = useColor();

    const handleSearch = async(query: string) => {
        setSearchQuery(query);
        const response = await UserService.getByEmail(query);
        console.log(response);
        if(response) {
            setFoundUser(response.data !== null);
            setSelectedUser(response.data);
            const updatedResults = [...searchResults, response.data];
            setSearchResults(updatedResults);
            if(onSearchResultChange) {
                onSearchResultChange(updatedResults);
            }
        }
    }
    const handleSendInvite = async() => {
        console.log(selectedUser, familyId);
        const response = await UserService.SendInviteToUser({
            toUserUid: selectedUser!.uid,
            fromUserUid: auth?.userUid!,
            toFamilyId: familyId
        });
        navigate.navigate("Profile");
    }
    return (
        <View style={{}}>
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    style={{
                        width: '70%',
                        backgroundColor: colors.textCard.main,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        paddingHorizontal: Padding.Small,
                    }}
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity style={{
                    width: '30%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: foundUser ? '#00A300' :  'red',

                }}
                onPress={handleSendInvite}>
                    <Text style={{
                        color: colors.text.main, 
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Small}}>Inviter</Text>
                </TouchableOpacity>
        </View>
    </View>
    )
}