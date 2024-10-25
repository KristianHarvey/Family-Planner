import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useColor } from "../../hooks/useColor";
import { useAuth } from "../../hooks/useAuth";
import { TopBar } from "../../components/common/topBar/TopBar";
import { Button } from "../../components/button/Button";
import { FamilyService } from "../../api/services/familyService";
import React, { useEffect } from "react";
import { User } from "../../models/user";
import { UserService } from "../../api/services/userService";
import { useNavigate } from "../../hooks/useNavigation";
import { Font, FontSize, Padding } from "../../constants/UIConstants";
import { Invite, inviteStatus } from "../../models/invite";
import { Family } from "../../models/family";
import { CustomSelect } from "../../components/customSelect/CustomSelect";
import { useRoute } from "@react-navigation/native";
import { CustomCard } from "../../components/customCard/CustomCard";
import { ProfileBase } from "../../components/profile/profileBase/ProfileBase";
import IonIcons from "react-native-vector-icons/Ionicons";
import { FamilyInfoCardBase } from "../../components/family/familyInfoBase/FamilyInfoCardBase";
import { TodayTasksWidget } from "../../components/widget/todayTasks/TodayTasksWidget";
import { PlannedDay } from "../../models/plannedDay";
import { DayKeyUtils } from "../../utils/DayKeyUtils";
import { PlannedDayService } from "../../api/services/plannedDayService";
import { InviteCard } from "../../components/invite/inviteCard/InviteCard";

interface ProfileScreenProps {
    family: Family;
}

interface CreatedFamilyProps {
    familyId: number;
}

const ProfileScreen = () => {
    const auth = useAuth();
    const [currentUser, setCurrentUser] = React.useState(auth.user);
    const [pendingInvites, setPendingInvites] = React.useState<Invite[]>([]);
    const [invites, setInvites] = React.useState<Invite[]>([]);
    const [families, setFamilies] = React.useState<Family[]>([]);
    const [currentFamily, setCurrentFamily] = React.useState<Family | undefined>();
    const [plannedDay, setPlannedDay] = React.useState<PlannedDay | undefined>();
    const [todayDate, setTodayDate] = React.useState(new Date());

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [shouldRefresh, setShouldRefresh] = React.useState(false);
    // const { currentUser, pendingInvites, invites, families, currentFamily } = userData;
    const { colors } = useColor();
    const navigate = useNavigate();
    const route = useRoute();

    const { family } = route.params as ProfileScreenProps || { family: null };
    console.log(family);
    const handleLogout = async() => {
        await auth?.logout();
    }

    const getPlannedDay = React.useCallback(async() => {
        const dayKey = DayKeyUtils.getDayKey(todayDate);
        const response = await PlannedDayService.getPlannedDayForCurrentUser(dayKey);
        if(response) {
            setPlannedDay(response.data);
        }
    }, [todayDate]);


    const fetchProfileInfo = React.useCallback(async () => {
        await fetchUserInfo();
        await fetchInvites();
        await updateFamilies();
        await getPlannedDay();
    }, [families, currentUser, pendingInvites, plannedDay])

    React.useEffect(() => {
        fetchProfileInfo();
    }, []);


    const fetchUserInfo = async () => {
        const response = await UserService.getCurrentUser();
        if(response) {
            setCurrentUser(response.data);

        }
    };

    const fetchInvites = async () => {
        const response = await UserService.getAllInvites();
        if (response) {
            setInvites(response.data);
        }
    };


    const handleNewFamilyNavigate = () => {
        navigate.navigate('CreateFamily')
    }


    const updateFamilies = async () => {
        const fetchedFamilies = await Promise.all(
            currentUser?.families?.map(async (family) => {
                const response = await FamilyService.getById(family.id ?? 0);
                return response?.data;
            }) ?? []
        );
        setFamilies(fetchedFamilies);
        if (fetchedFamilies.length > 0) {
            setCurrentFamily(fetchedFamilies[0]);
        }
    };

    const handleSelectFamily = (selectedFamily: Family) => {
        setCurrentFamily(selectedFamily);
    };

    const handleNavigateToInviteScreen = () => {
        const familyId = currentFamily?.id;
        navigate.navigate('InviteUser', { familyId });
    };

    const handleSettingsClick = () => {
        navigate.navigate('ProfileSetting');
    };

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

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        await fetchProfileInfo();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [fetchProfileInfo]);

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
            <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.background_main
            }}>
                <TopBar 
                middleText="Du" 
                rightIcon={'settings-outline'} 
                onRightComponentClick={handleSettingsClick}/>

                <ScrollView style={{
                    flex: 1,
                    backgroundColor: colors.background.main
                }}
                contentContainerStyle={{flexGrow: 1, backgroundColor: colors.background.main}}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <ProfileBase currentUser={currentUser} canUploadPicture={false}/>
                <TodayTasksWidget plannedDay={plannedDay}/>
                    <View style={{flex: 1, backgroundColor: colors.background.main}}>
                        <CustomCard text="Familie">
                            <CustomSelect 
                            data={families}
                            defaultValue={currentFamily}
                            renderItem={(selectedItem: Family, index, isSelected) => {
                                return (
                                    <View key={index}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        padding: 10, // Adjust padding as desired
                                        backgroundColor: isSelected ? colors.textCard.main : colors.textCard.secondary, // Change background color when selected
                                        borderBottomWidth: 1, // Add bottom border for separation
                                        borderBottomColor: colors.text.secondary, // Customize border color
                                    }}>
                                        <Text
                                        style={{
                                            color: colors.text.main
                                        }}>{selectedItem && selectedItem.name}</Text>
                                    </View>
                                )
                            }}
                            onSelect={handleSelectFamily} type="FAMILY"/>
                        <FamilyInfoCardBase family={currentFamily}/>
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
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default ProfileScreen;