import React from "react"
import { useAuth } from "../../../hooks/useAuth"
import { FamilyService } from "../../../api/services/familyService";
import { Family } from "../../../models/family";
import { FamilySelectorWidget } from "../../../components/widget/family/familySelectorWidget/FamilySelectorWidget";
import { TopBar } from "../../../components/topBar/TopBar";
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useColor } from "../../../hooks/useColor";
import { UserService } from "../../../api/services/userService";
import { User } from "../../../models/user";
import { WidgetBase } from "../../../components/widget/widgetBase/WidgetBase";
import { CustomSelect } from "../../../components/customSelect/CustomSelect";
import { useNavigate } from "../../../hooks/useNavigation";
import { FamilyInfoWidget } from "../../../components/widget/family/familyInfoWidget/FamilyInfoWidget";
import Slider from '@react-native-community/slider';
import { Font, FontSize, Padding } from "../../../constants/UIConstants";
import Feather from "react-native-vector-icons/Feather";
import { Button } from "../../../components/button/Button";
import { HsvColor } from "react-native-color-picker/dist/typeHelpers";
import { TextInput } from "react-native-gesture-handler";
import ColorPicker, { HueSlider, OpacitySlider, Panel1, Preview, Swatches } from "reanimated-color-picker";
import { toHsv } from "react-native-color-picker";


export const EditFamilyScreen = ({}) => {
    const auth = useAuth();
    const { colors } = useColor();
    const [currentUser, setCurrentUser] = React.useState<User | null>(auth.user);
    const [families, setFamilies] = React.useState<Family[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [updatedSelectedFamily, setUpdatedSelectedFamily] = React.useState(false);
    const [selectedFamily, setSelectedFamily] = React.useState<Family | undefined>();
    const [selectedFamilyColor, setSelectedFamilyColor] = React.useState<string | undefined>();
    const [colorSelectMode, setColorSelectMode] = React.useState(false);
    const navigate = useNavigate();
    const colorPickerRef = React.useRef(null);
    
    const updateFamilies = async () => {
        const fetchedFamilies = await Promise.all(
            currentUser?.families?.map(async (family) => {
                const response = await FamilyService.getById(family.id ?? 0);
                return response?.data;
            }) ?? []
        );
        console.log("Families: ", fetchedFamilies);
        if(fetchedFamilies) {
            setFamilies(fetchedFamilies);
        }
    };

    const updateUserInfo = async() => {
        const response = await UserService.getById(auth.user.id ?? 0);
        if(response) {
            const updatedUser = { ...currentUser, ...response.data };
            setCurrentUser(updatedUser);
        }
    }

    const getSelectedFamily = async() => {
        if(currentUser) {
            const response = await FamilyService.getById(currentUser.selectedFamilyId ?? 0);
            if(response) {
                const selectedFamily: Family = response.data;
                setSelectedFamily(selectedFamily);
            }
        }
    }

    const fetchProfileInfo = React.useCallback(async () => {
        await updateUserInfo();
        await updateFamilies();
        await getSelectedFamily();
        setUpdatedSelectedFamily(false);
    }, [families, currentUser, updatedSelectedFamily]);

    React.useEffect(() => {
        fetchProfileInfo();
    }, []);


    const handleSelectFamily = (selectedFamily: Family) => {
        setSelectedFamily(selectedFamily);
        setSelectedFamilyColor(selectedFamily.familyColor ?? colors.textCard.main);
    };

    const saveFamilySelect = async() => {
        if(selectedFamily != currentUser.selectedFamily) {
            console.log(selectedFamily);
            console.log("Saving selected family with: ", selectedFamily.id);
            const response = await UserService.updateSelectedFamily(currentUser.id ?? 0, selectedFamily.id);
            if(response) {
                setUpdatedSelectedFamily(true);
            }
        }
        if(selectedFamily.familyColor && selectedFamily.familyColor != currentUser.selectedFamily.familyColor) {
            console.log("Updating selected family with: ", selectedFamily);
            const response = await FamilyService.update(selectedFamily.id, {
                id: selectedFamily.id ?? 0,
                name: selectedFamily.name ?? '',
                familyColor: selectedFamily.familyColor ?? '',
                plannedDays: selectedFamily.plannedDays ?? []
            });
            if(response) {
                setUpdatedSelectedFamily(true);
            }
        }
        navigate.navigate("ProfileSetting");
    };

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        await fetchProfileInfo();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [fetchProfileInfo]);

    const onSelected = ({hex}) => {
        selectedFamily.familyColor = hex;
        console.log("Selected color: ", selectedFamily);
        setSelectedFamily(selectedFamily);
    }

    return (
        <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: colors.background_main
        }}>
            {colorSelectMode ? (
                <View style={{ flex: 1, marginBottom: Padding.XLarge * 3, backgroundColor: colors.background_main, justifyContent: 'center' }}>
                    <ColorPicker
                    value={selectedFamily.familyColor ?? colors.textCard.main}
                    onComplete={onSelected}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        padding: Padding.XLarge
                    }}>
                        <Preview style={{ marginBottom: Padding.Large }} />
                        <Panel1 style={{ marginBottom: Padding.Large }}/>
                        <HueSlider style={{ marginBottom: Padding.Large }}/>
                        <Swatches />
                    </ColorPicker>
                    <Button title="Bekreft" onPress={() => setColorSelectMode(!colorSelectMode)}/>
                    {/* <HsvColorPicker
                    huePickerHue={selectedFamilyColorState.hue}
                    satValPickerHue={selectedFamilyColorState.hue}
                    satValPickerValue={selectedFamilyColorState.val}
                    satValPickerSaturation={selectedFamilyColorState.sat}
                    onHuePickerPress={onHuePickerChange}
                    onHuePickerDragMove={onHuePickerChange}
                    onSatValPickerPress={onSatValPickerChange}
                    onSatValPickerDragMove={onSatValPickerChange}
                    /> */}
                    {/* <ColorPicker
                    color={selectedFamilyColor}
                    onColorChange={handleColorChange}
                    style={{
                        flex: 1
                    }}/>

                    <View style={{ marginTop: Padding.XLarge }}/>
                    <Button onPress={() => setColorSelectMode(!colorSelectMode)} title="Bekreft"/> */}
                </View>
                
            ): (
                <View>
                <TopBar 
                cameFromScreen="ProfileSetting" 
                leftIcon={'arrow-back'} 
                middleText="Rediger familier"
                rightText="lagre"
                rightTextColor={colors.text.secondary}
                onRightComponentClick={saveFamilySelect}/>
                <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                    <FamilyInfoWidget family={selectedFamily}/>
                    {families.length > 1 && (
                        <FamilySelectorWidget
                        families={families}
                        defaultSelectedFamily={selectedFamily}
                        setSelectedFamily={handleSelectFamily}/>
                    )}
                    <WidgetBase
                    sideMargins
                    pressable
                    familyType
                    familyColor={selectedFamily && selectedFamily.familyColor ? selectedFamily.familyColor : colors.widget_background}
                    onPress={() => setColorSelectMode(!colorSelectMode)}>
                        <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text
                            style={{
                                color: colors.text_main,
                                fontFamily: Font.TitilliumWebRegular,
                                fontSize: FontSize.Medium
                            }}>
                                Familiefarge
                            </Text>
                            <Feather 
                            style={{marginRight: 4}} 
                            name="edit" 
                            size={26} 
                            color={colors.text.main}/>
                        </View>
                        <Text
                        style={{
                            color: colors.accent_spring,
                            fontFamily: Font.TitilliumWebRegular,
                            fontSize: FontSize.XSmall
                        }}>
                            Denne fargen vises for alle planene for denne familien
                        </Text>
                    </WidgetBase>
                </ScrollView>
                </View>
            )}
        </SafeAreaView>
    )
}