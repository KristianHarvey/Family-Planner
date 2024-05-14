import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { TopBar } from "../../components/topBar/TopBar"
import { ShoppingList, ShoppingListItem } from "../../models/shoppingList"
import { useRoute } from "@react-navigation/native";
import React from "react";
import { useColor } from "../../hooks/useColor";
import { SearchItems } from "../../components/search/searchItems.tsx/SearchItems";
import { useNavigate } from "../../hooks/useNavigation";
import { ShoppingListItemView } from "../../components/shoppingList/shoppingListItemView/ShoppingListItemView";
import { Font, FontSize, Padding } from "../../constants/UIConstants";
import { ShoppingListItemEditWidget } from "../../components/widget/shoppingList/shoppingListItemWidget/ShoppingListItemEditWidget";
import { ShoppingListItemWidget } from "../../components/widget/shoppingList/shoppingListItemWidget/ShoppingListItemWidget";
import Feather from "react-native-vector-icons/Feather";

interface EditRouteProps {
    currentShoppingList?: ShoppingList;
}

export const ShoppingListEditScreen = () => {
    const route = useRoute();
    const { currentShoppingList } = route.params as EditRouteProps;
    if(!currentShoppingList) {
        return null;
    }
    const navigate = useNavigate();
    const { colors } = useColor();
    const [changedShoppingList, setChangedShoppingList] = React.useState(currentShoppingList);

    const handleSaveShoppingList = () => {

    };

    const handleNavigateBack = () => {
        navigate.navigate("ShoppingListView", {changedShoppingList});
    }

    const handleAddItemToList = (item: ShoppingListItem) => {
        const existingItemIndex = changedShoppingList.items.findIndex(
            (existingItem) => existingItem.id === item.id
        );
        const updatedShoppingList = { ...changedShoppingList};
        if(existingItemIndex !== -1) {
            updatedShoppingList.items[existingItemIndex].quantity += 1;
        } else {
            item.quantity = 1;
            updatedShoppingList.items.push(item);
        }
        setChangedShoppingList(updatedShoppingList);
        console.log(updatedShoppingList.items);
    }

    const handleRemoveItemToList = (item: ShoppingListItem) => {
        const existingItemIndex = changedShoppingList.items.findIndex(
            (existingItem) => existingItem.id === item.id
        );
        const updatedShoppingList = { ...changedShoppingList};
        if(existingItemIndex !== -1) {
            updatedShoppingList.items[existingItemIndex].quantity -= 1;
            if(updatedShoppingList.items[existingItemIndex].quantity <= 0) {
                updatedShoppingList.items.splice(existingItemIndex, 1);
            }
        }
        setChangedShoppingList(updatedShoppingList);
        console.log(updatedShoppingList.items);
    }

    const itemQuantity = (item: ShoppingListItem) => {
        const index = changedShoppingList.items.findIndex((currentItem) => currentItem.id === item.id);
        return changedShoppingList.items[index] && changedShoppingList.items[index].quantity;
    }

    
    return (
        <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: colors.background.main
        }}>
            <TopBar 
            leftIcon={'arrow-back'}
            onLeftComponentClick={handleNavigateBack}
            cameFromScreen="ShoppingListView" 
            middleText={changedShoppingList.name}
            rightText="lagre"
            onRightComponentClick={handleSaveShoppingList}
            rightTextColor={colors.text.secondary}/>
            <SearchItems 
            shoppingList={changedShoppingList}
            onChangedShoppingList={setChangedShoppingList}/>
            <ScrollView
            style={{
            }}>
                {changedShoppingList.items.map((item, index) => (
                        <ShoppingListItemWidget key={index} item={item}>
                            {itemQuantity(item) > 0 ? (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
                                    <Feather name='minus' size={30} color={colors.text.main} />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: Font.TitilliumWebRegular, fontSize: FontSize.Small, color: colors.text.main }}>{itemQuantity(item)}</Text>
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
                                <Feather name='plus' size={30} color={colors.text.main} />
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
                        </ShoppingListItemWidget>
                    // <TouchableOpacity
                    // style={{
                    //     padding: Padding.Medium,
                    // }}>
                    //     <ShoppingListItemView name={item.name} price={item.currentPrice} uri={item.image}/>
                    // </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}