import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useColor } from "../../hooks/useColor";
import { useAuth } from "../../hooks/useAuth";
import { TopBar } from "../../components/topBar/TopBar";
import { Button } from "../../components/button/Button";
import { FamilyService } from "../../api/services/familyService";
import React, { useEffect } from "react";
import { User } from "../../models/user";
import { UserService } from "../../api/services/userService";
import { useNavigate } from "../../hooks/useNavigation";
import { Font, FontSize, Padding } from "../../constants/UIConstants";
import { InviteCard } from "../../components/inviteCard/InviteCard";
import { Invite, inviteStatus } from "../../models/invite";
import { Family } from "../../models/family";
import { CustomSelect } from "../../components/customSelect/CustomSelect";
import { useRoute } from "@react-navigation/native";
import { CustomCard } from "../../components/customCard/CustomCard";
import { ProfileBase } from "../../components/profile/profileBase/ProfileBase";

interface ProfileScreenProps {
    family: Family;
    isCreated: boolean;
}

const ProfileScreen = () => {
    const auth = useAuth();
    const [currentUser, setCurrentUser] = React.useState<User | undefined>(auth?.user!);
    const [pendingInvites, setPendingInvites] = React.useState<Invite[]>([]);
    const [invites, setInvites] = React.useState<Invite[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [shouldRefresh, setShouldRefresh] = React.useState(false);
    const [families, setFamilies] = React.useState<Family[]>([]);
    const [currentFamily, setCurrentFamily] = React.useState<Family | undefined>();
    const [loading, setLoading] = React.useState(false);
    const { colors } = useColor();
    const navigate = useNavigate();
    const route = useRoute();

    // const {family, isCreated} = route.params as ProfileScreenProps;

    const handleLogout = async() => {
        await auth?.logout();
    }

    const handleNewFamily = async() => {
        const response = await FamilyService.createNew({
            name: "Ny familie",
        });
        if(response) {
            console.log(response);
        }
    }
    const handleNewFamilyNavigate = () => {
        navigate.navigate('CreateFamily')
    }

    const getAllFamilies = async() => {
        const families: Family[] = [];
        console.log("USERS FAMILIES SIZE: ", currentUser?.families?.length);
        currentUser?.families?.forEach((family) => {
            families.push(family);
        })
        console.log("FAMILIES!!: ", families);
        setFamilies(families);
    }

    const fetchInvites = async() => {
        const response = await UserService.getAllInvites();
        if(response) { 
            console.log(response.data);
            setInvites(response.data);
        }
    }

    const fetchUserInfo = async() => {
        const families: Family[] = [];
        currentUser!.families?.forEach((family) => {
            families.push(family);
        })
        setFamilies(families);
        setCurrentFamily(families[0]);
    }

    const fetchProfileInfo = async() => {
        await fetchUserInfo();
        // getAllFamilies();
        await fetchInvites();
    }

    
    React.useEffect(() => {
        const fetchInfo = async() => {
            onLoading();
        }
        fetchInfo();
    }, [])
    
    React.useEffect(() => {
        fetchProfileInfo();
        setShouldRefresh(false);
    }, [shouldRefresh]);

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        await fetchProfileInfo();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [fetchProfileInfo]);


    const onLoading = React.useCallback(async() => {
        setLoading(true);
        await fetchProfileInfo();
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [fetchProfileInfo]);

    React.useEffect(() => {
        const invitesWithPendingStatus: Invite[] = [];
        invites.forEach((invite) => {
            if(invite.status !== inviteStatus.Pending) {
                return;
            }
            invitesWithPendingStatus.push(invite);
        });
        setPendingInvites(invitesWithPendingStatus);
    }, [invites]);

    const handleSelectFamily = async(selectedFamily: Family, index: number) => {
        console.log("SELECTED FAMILY: ", selectedFamily);
        setCurrentFamily(selectedFamily);

    }
    const getDefaultValue = async(): Promise<string | undefined> => {
        await fetchUserInfo();
        return currentFamily?.name;
    }

    const handleNavigateToInviteScreen = () => {
        const familyId = currentFamily?.id;
        navigate.navigate('InviteUser', { familyId });
    }
    const handleSettingsClick = () => {
        navigate.navigate("ProfileSetting");
    }
    if(loading) {
        return (
        <View style={{
            flex: 1,
            backgroundColor: colors.background.main,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size='large'/>
        </View>
    );
    } else {
        return (
            <ScrollView style={{
                flex: 1,
                backgroundColor: colors.background.main
            }}
            contentContainerStyle={{flexGrow: 1, backgroundColor: colors.background.main}}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <TopBar 
                middleText="Du" 
                rightIcon={'settings-outline'} 
                onRightComponentClick={handleSettingsClick}/>
                <ProfileBase/>
                    <View style={{flex: 1, backgroundColor: colors.background.main}}>
                        <CustomCard text="Familie">
                            <CustomSelect 
                            data={families}
                            defaultValue={currentFamily}
                            renderItem={(selectedItem: Family, index, isSelected) => {
                                return (
                                    <View key={index}
                                    style={{
                                        padding: 10, // Adjust padding as desired
                                        backgroundColor: isSelected ? colors.textCard.main : colors.textCard.secondary, // Change background color when selected
                                        borderBottomWidth: 1, // Add bottom border for separation
                                        borderBottomColor: colors.text.secondary, // Customize border color
                                    }}>
                                        <Text
                                        style={{
                                            color: colors.text.main
                                        }}>{selectedItem.name}</Text>
                                    </View>
                                )
                            }}
                            onSelect={handleSelectFamily} type="FAMILY"/>
                        <Button title="Lag ny familie" onPress={handleNewFamilyNavigate}/>
                        <Button title="Inviter en bruker til familien"
                        onPress={handleNavigateToInviteScreen}/>
                        <View
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: colors.text.main,
                            marginTop: Padding.Large,
                        }}>
                            <Text
                            style={{
                                color: colors.text.main,
                                fontFamily: Font.TitilliumWebRegular,
                                fontSize: FontSize.Small,
                            }}>Invitasjoner</Text>
                        </View>
                        </CustomCard>
                        <View>
                            {pendingInvites && pendingInvites.map((pendingInvite, index) => {
                                return (
                                    <InviteCard
                                    key={index} 
                                    familyName={pendingInvite.family?.name!} 
                                    fromUserFirstName={pendingInvite.fromUser?.firstName!}
                                    invite={pendingInvite}
                                    onButtonClick={() => setShouldRefresh(true)}/>
                                )
                            })}
                        </View>
                        <Button style={{
                        }} onPress={handleLogout} title="logout"/>
                    </View>
            </ScrollView>
        );
    }
};

export default ProfileScreen;