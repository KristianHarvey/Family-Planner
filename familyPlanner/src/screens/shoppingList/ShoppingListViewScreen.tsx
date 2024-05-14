import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { useColor } from "../../hooks/useColor";
import { ShoppingList, ShoppingListItem } from "../../models/shoppingList";
import { ActivityIndicator, FlatList, Modal, RefreshControl, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Font, FontSize, Padding } from "../../constants/UIConstants";
import { TopBar } from "../../components/topBar/TopBar";
import { CustomSelect } from "../../components/customSelect/CustomSelect";
import { KassalappProduct } from "../../models/kassalappModel";
import { KassalappService } from "../../api/services/kassalAppService";
import filter from "lodash.filter";
import { SearchItems } from "../../components/search/searchItems.tsx/SearchItems";
import { useNavigate } from "../../hooks/useNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ShoppingListItemWidget } from "../../components/widget/shoppingList/shoppingListItemWidget/ShoppingListItemWidget";
import { ShoppingListInfoWidget } from "../../components/widget/shoppingList/shoppingListInfoWidget/ShoppingListInfoWidget";
import { ShoppingListPlanWidget } from "../../components/widget/shoppingList/shoppingListPlanWidget/ShoppingListPlanWidget";
import { PlannedDayService } from "../../api/services/plannedDayService";
import { DayKeyUtils } from "../../utils/DayKeyUtils";
import { ShoppingListService } from "../../api/services/shoppingListService";
import Feather from "react-native-vector-icons/Feather";
import { ShoppingListItemEditWidget } from "../../components/widget/shoppingList/shoppingListItemWidget/ShoppingListItemEditWidget";

interface ShoppingListRouteProps {
    shoppingListId?: number;
    cameFrom?: string;
}

const ShoppingListViewScreen = () => {
    const route = useRoute();
    // const { shoppingList } = route.params as ShoppingListRouteProps;
    const { shoppingListId, cameFrom } = route.params as ShoppingListRouteProps
    if(!shoppingListId) {
        return;
    }
    console.log(shoppingListId, cameFrom);
    const { colors } = useColor();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [kassalappItems, setKassalappItems] = React.useState<KassalappProduct[]>([]);
    const [selectedKassalappItem, setSelectedKassalappItem] = React.useState<KassalappProduct | undefined>();
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentShoppingList, setCurrentShoppingList] = React.useState<ShoppingList | undefined>(undefined);
    const [editState, setEditState] = React.useState(false);
    const [plannedDayKey, setPlannedDayKey] = React.useState<string>('');
    const [refreshing, setRefreshing] = React.useState(false);
    // const [changedShoppingList, setChangedShoppingList] = React.useState(shoppingList);

    // React.useEffect(() => {
    //     setIsLoading(true);
    //     fetchProductsFromQuery();
    // }, []);

    const fetchShoppingList = async() => {
        const response = await ShoppingListService.getById(shoppingListId);
        if(response) {
            setCurrentShoppingList(response.data);
        }
        setIsLoading(false);
    }

    React.useEffect(() => {
        fetchShoppingList();
    }, [shoppingListId]);

    React.useEffect(() => {
        setIsLoading(true);
        fetchProductsFromQuery('');
    }, []);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         setCurrentShoppingList(shoppingList || currentShoppingList);
    //     }, [shoppingList, currentShoppingList])
    // );

    const fetchProductsFromQuery = async (query: string) => {
        try {
            setIsLoading(true);
            if (!query) {
                setKassalappItems([]);
                return;
            }

            const response = await KassalappService.searchProduct(query);
            if (response) {
                setKassalappItems(response);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setIsLoading(false);
        }
    };

    const handleAddItemToList = (item: ShoppingListItem) => {
        const existingItemIndex = currentShoppingList.items.findIndex(
            (existingItem) => existingItem.id === item.id
        );
        const updatedShoppingList = { ...currentShoppingList};
        if(existingItemIndex !== -1) {
            updatedShoppingList.items[existingItemIndex].quantity += 1;
        } else {
            item.quantity = 1;
            updatedShoppingList.items.push(item);
        }
        setCurrentShoppingList(updatedShoppingList);
        console.log(updatedShoppingList.items);
    }

    const handleRemoveItemToList = (item: ShoppingListItem) => {
        const existingItemIndex = currentShoppingList.items.findIndex(
            (existingItem) => existingItem.id === item.id
        );
        const updatedShoppingList = { ...currentShoppingList};
        if(existingItemIndex !== -1) {
            updatedShoppingList.items[existingItemIndex].quantity -= 1;
            if(updatedShoppingList.items[existingItemIndex].quantity <= 0) {
                updatedShoppingList.items.splice(existingItemIndex, 1);
            }
        }
        setCurrentShoppingList(updatedShoppingList);
        console.log(updatedShoppingList.items);
    }

    const handleEditShoppingList = () => {
        setEditState(true);
        // navigate.navigate("ShoppingListEdit", {currentShoppingList});
    }
    const handleSaveShoppingList = async() => {
        if(currentShoppingList.plannedDay) {
            const response = await PlannedDayService.createUpdateShoppingList(currentShoppingList.plannedDay.dayKey, {
                id: currentShoppingList.id ?? 0,
                name: currentShoppingList.name ?? '',
                items: currentShoppingList.items ?? [],
                
            });
            if(response) {
                setCurrentShoppingList(response.data);
            }
        } else {
            const response = await ShoppingListService.update(currentShoppingList.id ?? 0, {
                id: currentShoppingList.id ?? 0,
                name: currentShoppingList.name ?? '',
                items: currentShoppingList.items ?? []
            });
            if(response) {
                setCurrentShoppingList(response.data);
            }
        }
        setEditState(false);
    }
    const itemQuantity = (item: ShoppingListItem) => {
        const index = currentShoppingList.items.findIndex((currentItem) => currentItem.id === item.id);
        return currentShoppingList.items[index] && currentShoppingList.items[index].quantity;
    }

    // React.useEffect(() => {
    //     setIsLoading(true);
    //     fetchProductsFromQuery();
    // }, [searchQuery]);
    // const fetchProductsFromQuery = React.useCallback(async() => {
    //     if(!searchQuery) {
    //         const response = await KassalappService.getFirst100Products();
    //         if(response) {
    //             setKassalappItems(response);
    //         }
    //         return;
    //     }
    //     const response = await KassalappService.searchProduct(searchQuery);
    //     if(response) {
    //         setKassalappItems(response);
    //     }
    // });

    // React.useEffect(() => {
    //     fetchProductsFromQuery();
    // }, [searchQuery]);

    // if( isLoading ) {
    //     return (
    //         <View
    //         style={{
    //             flex: 1,
    //             backgroundColor: colors.background.main,
    //         }}>
    //             <ActivityIndicator size={'large'} color={colors.text.main}/>
    //         </View>
    //     )
    // }


    const handleSelect = (selectedItem: KassalappProduct) => {
        setSelectedKassalappItem(selectedItem);
    }

    const handleSearch = async(query: string) => {
        setSearchQuery(query);
        await fetchProductsFromQuery(query);
        console.log(kassalappItems);
    }

    const renderItem = ({ item }: { item: KassalappProduct }) => (
        <TouchableOpacity
            style={{
                backgroundColor: colors.textCard.main,
                padding: 10,
                marginVertical: 5,
                borderRadius: 5,
            }}>
            <Text style={{ color: colors.text.main }}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handlePlannedDayRequest = async() => {
        console.log("Planned day key: ", plannedDayKey);
        if(plannedDayKey) {
            const response = await PlannedDayService.createUpdateShoppingList(plannedDayKey, {
                id: currentShoppingList.id ?? 0,
                name: currentShoppingList.name,
                items: currentShoppingList.items ?? [],
            });
            console.log(plannedDayKey);
            if(response) {
                console.log(response);
                setCurrentShoppingList(response.data)
            }
        }
    }

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        await fetchShoppingList();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [fetchShoppingList]);

    if(isLoading) {
        return (
            <ActivityIndicator/>
        )
    }
    return (
        <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: colors.background.main
        }}>
            {editState ? (
                <View>
                    <TopBar 
                    leftIcon={'arrow-back'} 
                    cameFromScreen={cameFrom ?? "ShoppingList"}
                    middleText={currentShoppingList.name}
                    rightText="lagre"
                    onRightComponentClick={handleSaveShoppingList}
                    rightTextColor={colors.text.secondary}/>
                    <SearchItems 
                    shoppingList={currentShoppingList}
                    onChangedShoppingList={setCurrentShoppingList}/>
                    <ScrollView
                    style={{
                    }}>
                        {currentShoppingList.items.map((item, index) => (
                            <ShoppingListItemEditWidget key={index} item={item}>
                                {itemQuantity(item) > 0 ? (
                                <View 
                                style={{ flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: 30 / 2,
                                            backgroundColor: colors.textCard.secondary,
                                            marginRight: Padding.Small,
                                            }}
                                            onPress={() => handleRemoveItemToList(item)}>
                                        <Feather 
                                        name='minus' 
                                        size={30} 
                                        color={colors.text.main}/>
                                        </TouchableOpacity>
                                        <Text 
                                        style={{ 
                                            fontFamily: Font.TitilliumWebRegular, 
                                            fontSize: FontSize.Small, 
                                            color: colors.text.main }}>
                                                {itemQuantity(item)}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 30 / 2,
                                        backgroundColor: colors.textCard.secondary,
                                        marginLeft: Padding.Small,
                                    }}
                                    onPress={() => handleAddItemToList(item)}>
                                    <Feather 
                                    name='plus' 
                                    size={30} 
                                    color={colors.text.main}/>
                                    </TouchableOpacity>
                                </View>
                                ) : (
                                <TouchableOpacity
                                    style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 30 / 2,
                                    backgroundColor: colors.textCard.secondary,
                                    }}
                                    onPress={() => handleAddItemToList(item)}>
                                    <Feather name='plus' size={30} color={colors.text.main} />
                                </TouchableOpacity>
                                )}
                            </ShoppingListItemEditWidget>
                            // <TouchableOpacity
                            // style={{
                            //     padding: Padding.Medium,
                            // }}>
                            //     <ShoppingListItemView name={item.name} price={item.currentPrice} uri={item.image}/>
                            // </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            ): (
                <View>
                    <TopBar 
                    leftIcon={'arrow-back'} 
                    cameFromScreen={cameFrom ?? "ShoppingList"}
                    middleText={currentShoppingList.name}
                    rightText="rediger"
                    onRightComponentClick={handleEditShoppingList}
                    rightTextColor={colors.text.secondary}/>
                    <ScrollView
                    contentContainerStyle={{flexGrow: 1, backgroundColor: colors.background.main}}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                        <ShoppingListInfoWidget 
                        shoppingList={currentShoppingList}/>
                        {!currentShoppingList.plannedDay && (
                            <ShoppingListPlanWidget 
                            shoppingList={currentShoppingList} 
                            onConfirmedPlannedDay={handlePlannedDayRequest} 
                            onPlannedDayRequest={(dayKey) => setPlannedDayKey(dayKey)}/>
                        )}
                        {currentShoppingList && currentShoppingList.items.map((item, index) => (
                            <ShoppingListItemWidget key={index} item={item}/>
                        ))}
                    </ScrollView>
                </View>
            )}
            {/* {kassalappItems && (
                kassalappItems.map((item, index) => {
                    return (
                        <TouchableOpacity
                        style={{
                            backgroundColor: colors.textCard.main
                        }}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })
            )} */}
            {/* {isLoading ? (
                <ActivityIndicator size={'large'} color={colors.text.main} />
            ) : (
                <FlatList
                    data={kassalappItems}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}/>
            )} */}
        </SafeAreaView>
    );
};
export default ShoppingListViewScreen;