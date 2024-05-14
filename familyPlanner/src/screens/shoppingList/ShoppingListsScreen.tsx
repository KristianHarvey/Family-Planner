import { Modal, RefreshControl, SafeAreaView, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import { useColor } from "../../hooks/useColor";
import { TopBar } from "../../components/topBar/TopBar";
import { Font, FontSize, Padding } from "../../constants/UIConstants";
import React from "react";
import { CustomCard } from "../../components/customCard/CustomCard";
import { CustomCardWithoutText } from "../../components/customCard/CustomCardWithoutText";
import IonIcons from "react-native-vector-icons/Ionicons";
import { Button } from "../../components/button/Button";
import { PlannedDayService } from "../../api/services/plannedDayService";
import { ShoppingListService } from "../../api/services/shoppingListService";
import { ShoppingList } from "../../models/shoppingList";
import Feather from "react-native-vector-icons/Feather";
import { useNavigate } from "../../hooks/useNavigation";
import { WidgetBase } from "../../components/widget/widgetBase/WidgetBase";
import { ShoppingListWidget } from "../../components/widget/shoppingList/shoppingListWidget/ShoppingListWidget";
import WeekCalendar from "../../components/weekCalendar/WeekCalendar";

const ShoppingListsScreen = () => {
    const { colors } = useColor();
    const navigate = useNavigate();
    const [quantity, setQuantity] = React.useState('');
    const [itemName, setItemName] = React.useState('');
    const [shoppingListName, setShoppingListName] = React.useState('');
    const [createdNewShoppingList, setCreatedNewShoppingList] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [shoppingLists, setShoppingLists] = React.useState<ShoppingList[]>([]);
    const [itemCount, setItemCount] = React.useState(0);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleCreateNewShoppingList = async() => {
        if(!shoppingListName) {
            return;
        }
        const response = await ShoppingListService.create({
            name: shoppingListName
        });
        if(response) {
            setIsModalVisible(false);
            setCreatedNewShoppingList(true);
        }
    }

    const fetchShoppingLists = async() => {
        const response = await ShoppingListService.getAllForCurrentUser();
        if(response) {
            const fetchedshoppingLists: ShoppingList[] = response.data;
            setShoppingLists(fetchedshoppingLists);
        }
    }

    React.useEffect(() => {
        fetchShoppingLists();
    }, []);

    React.useEffect(() => {
        fetchShoppingLists();
        setCreatedNewShoppingList(false);
    }, [createdNewShoppingList]);

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        await fetchShoppingLists();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [fetchShoppingLists]);

    const handleNavigateToShoppingList = (shoppingList) => {
        console.log(shoppingList);
        const shoppingListId = shoppingList.id ?? 0;
        navigate.navigate("ShoppingListView", {shoppingListId, cameFrom: "ShoppingList"});
    }

    const renderModal = () => {
        return (
        <Modal
        animationType="slide"
        style={{
            backgroundColor: colors.textCard.secondary
        }}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
            setIsModalVisible(!isModalVisible);
        }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 22
            }}>
                <View
                style={{
                    backgroundColor: colors.textCard.secondary,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    width: '85%',
                }}>
                    <View
                    style={{
                        marginTop: Padding.Large,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text
                        style={{
                            marginTop: Padding.Small,
                            color: colors.text.main,
                            paddingHorizontal: Padding.Large,
                            fontFamily: Font.TitilliumWebRegular,
                            fontSize: FontSize.Medium,
                        }}>Lag ny handleliste</Text>
                        <View
                        style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            marginRight: Padding.Medium,
                        }}>
                            <IonIcons
                            name="close"
                            size={30}
                            color={colors.text.main}
                            onPress={() => setIsModalVisible(!isModalVisible)}/>
                        </View>
                    </View>
                    <View
                    style={{
                        padding: Padding.XLarge,
                    }}>
                        <TextInput
                        placeholder="Navn på listen"
                        onChangeText={setShoppingListName}
                        placeholderTextColor={colors.textCard.main}
                        style={{
                            borderWidth: 1,
                            borderColor: colors.background.main,
                            backgroundColor: colors.text.main,
                            padding: Padding.Large,
                            marginLeft: Padding.Large,
                            marginRight: Padding.Large,
                            borderRadius: 5,
                        }}
                        />
                        <View
                        style={{marginTop: Padding.XLarge}}>
                            <Button
                            color={!shoppingListName ? colors.textCard.main : colors.text.secondary}
                            textColor={!shoppingListName ? colors.textCard.secondary : colors.text.main}
                            title="Lagre"
                            onPress={handleCreateNewShoppingList}/>
                            <Text style={{
                                marginTop: Padding.Large,
                                textAlign: 'center',
                                color: colors.textCard.main,
                                fontFamily: Font.TitilliumWebRegular,
                                fontSize: FontSize.Medium,
                                textDecorationLine: 'underline',
                                textDecorationColor: 'red'
                            }} onPress={() => setIsModalVisible(!isModalVisible)}>Avbryt</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
        )
    }


    return (
        <SafeAreaView
        style={{flex: 1, backgroundColor: colors.background.main}}>
            <ScrollView
            contentContainerStyle={{flexGrow: 1, backgroundColor: colors.background.main}}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <TopBar middleText="Handlelister"/>
                <View
                style={{
                    width: '50%'
                }}>
                    <Button title="Lag ny handleliste" onPress={() => setIsModalVisible(true)}/>
                </View>
                {renderModal()}
                {shoppingLists && shoppingLists.map((shoppingList, index) => (
                    <ShoppingListWidget key={index} onPress={handleNavigateToShoppingList} shoppingList={shoppingList}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ShoppingListsScreen;