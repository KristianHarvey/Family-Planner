import React from "react";
import { useColor } from "../../../hooks/useColor";
import { KassalappService } from "../../../api/services/kassalAppService";
import { FlatList, Image, ListRenderItem, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TopBar } from "../../topBar/TopBar";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";
import { KassalappProduct } from "../../../models/kassalappModel";
import Feather from "react-native-vector-icons/Feather"
import { ShoppingList, ShoppingListItem } from "../../../models/shoppingList";
import { CustomCardWithoutText } from "../../customCard/CustomCardWithoutText";
import { ShoppingListItemView } from "../../shoppingList/shoppingListItemView/ShoppingListItemView";

interface SearchItemsProps {
    shoppingList?: ShoppingList | undefined;
    onChangedShoppingList?: (shoppingList) => void;
}

export const SearchItems: React.FC<SearchItemsProps> = ({shoppingList, onChangedShoppingList}) => {
    if(!shoppingList) {
        return;
    }
    const { colors } = useColor();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [kassalappItems, setKassalappItems] = React.useState<ShoppingListItem[]>([]);
    const [selectedKassalappItem, setSelectedKassalappItem] = React.useState<KassalappProduct | undefined>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [testItems, setTestItems] = React.useState<ShoppingListItem[]>([]);
    const [changedShoppingList, setChangedShoppingList] = React.useState(shoppingList);

    
    // React.useEffect(() => {
    //     setIsLoading(true);
    //     fetchProductsFromQuery();
    // }, []);

    React.useEffect(() => {
        setIsLoading(true);
        fetchProductsFromQuery('');
    }, []);

    React.useEffect(() => {
        setTestItems([
            {
                id: 1,
                name: 'Grandiosa Original 575g',
                brand: 'Stabburet',
                image: 'https://cdcimg.coop.no/rte/RTE2/7039010560078.png',
                currentPrice: 54.90
            },
            {
                id: 2,
                name: 'Grandiosa Tynn Bunn',
                brand: 'Stabburet',
                image: 'https://cdcimg.coop.no/rte/RTE2/7039010560078.png',
                currentPrice: 54.90
            },
            {
                id: 3,
                name: 'Grandiosa Original 575g',
                brand: 'Stabburet',
                image: 'https://cdcimg.coop.no/rte/RTE2/7039010560078.png',
                currentPrice: 54.90
            },
            {
                id: 4,
                name: 'Grandiosa Tynn Bunn',
                brand: 'Stabburet',
                image: 'https://cdcimg.coop.no/rte/RTE2/7039010560078.png',
                currentPrice: 54.90
            },
            {
                id: 5,
                name: 'Grandiosa Original 575g',
                brand: 'Stabburet',
                image: 'https://cdcimg.coop.no/rte/RTE2/7039010560078.png',
                currentPrice: 54.90
            },
            {
                id: 6,
                name: 'Grandiosa Tynn Bunn',
                brand: 'Stabburet',
                image: 'https://cdcimg.coop.no/rte/RTE2/7039010560078.png',
                currentPrice: 54.90
            },
            {
                id: 7,
                name: 'Grandiosa Original 575g',
                brand: 'Stabburet',
                image: 'https://cdcimg.coop.no/rte/RTE2/7039010560078.png',
                currentPrice: 54.90
            },
            {
                id: 8,
                name: 'Grandiosa Tynn Bunn',
                brand: 'Stabburet',
                image: 'https://cdcimg.coop.no/rte/RTE2/7039010560078.png',
                currentPrice: 54.90
            }
        ])
    }, []);

    const fetchProductsFromQuery = async (query: string) => {
        try {
            setIsLoading(true);
            if (!query) {
                setKassalappItems([]);
                return;
            }

            const response = await KassalappService.searchProduct(query);
            if (response) {
                const items: ShoppingListItem[] = response.map((item) => ({
                    id: item.id ?? 0,
                    name: item.name ?? "",
                    brand: item.brand ?? "",
                    ean: item.ean,
                    url: item.url,
                    image: item.image,
                    description: item.description,
                    ingredients: item.ingredients,
                    currentPrice: item.currentPrice,
                    currentUnitPrice: item.currentUnitPrice,
                    priceHistory: item.priceHistory,
                    allergens: item.allergens,
                    nutrition: item.nutrition,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }));
                setKassalappItems(items);
            }
            setIsLoading(false);

        } catch (error) {
            console.error('Error fetching products:', error);
            setIsLoading(false);
        }
    };

    const addItemToList = (item: ShoppingListItem) => {
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
        if(onChangedShoppingList) {
            onChangedShoppingList(updatedShoppingList);
        }
        console.log(updatedShoppingList.items);
    }

    const removeItemFromList = (item: ShoppingListItem) => {
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
        if(onChangedShoppingList) {
            onChangedShoppingList(updatedShoppingList);
        }
        console.log(updatedShoppingList.items);
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
    const renderItem: ListRenderItem<ShoppingListItem> = ({ item }) => {
        const itemIndex = changedShoppingList.items.findIndex((existingItem) => existingItem.id === item.id);
        const itemQuantity = changedShoppingList.items[itemIndex] && changedShoppingList.items[itemIndex].quantity;
        return (
            <TouchableOpacity
            style={{
                padding: 10,
                marginVertical: 5,
                borderRadius: 5,
            }}>
                <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <ShoppingListItemView uri={item.image} price={item.currentPrice} name={item.name}/>
                    {itemQuantity && itemQuantity > 0 ? (
                        <View
                        style={{
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30 / 2,
                                backgroundColor: colors.textCard.secondary,
                                marginRight: Padding.Small,
                            }}
                            onPress={() => removeItemFromList(item)}>
                                <Feather
                                name='minus'
                                size={30}
                                color={colors.text.main}/>
                            </TouchableOpacity>
                            <Text
                            style={{
                                fontFamily: Font.TitilliumWebRegular,
                                fontSize: FontSize.Small,
                                color: colors.text.main
                            }}>{itemQuantity}</Text>
                            <TouchableOpacity
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30 / 2,
                                backgroundColor: colors.textCard.secondary,
                                marginLeft: Padding.Small
                            }}
                            onPress={() => addItemToList(item)}>
                                <Feather
                                name='plus'
                                size={30}
                                color={colors.text.main}/>
                            </TouchableOpacity>
                        </View>
                    ): (
                        <TouchableOpacity
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 30 / 2,
                            backgroundColor: colors.textCard.secondary,
                        }}
                        onPress={() => addItemToList(item)}>
                            <Feather
                            name='plus'
                            size={30}
                            color={colors.text.main}/>
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>
        )
    }

    // const renderItem = { item: ShoppingListItem }) => (
    //     <TouchableOpacity
    //         style={{
    //             padding: 10,
    //             marginVertical: 5,
    //             borderRadius: 5,
    //         }}>
    //             <View
    //             style={{
    //                 flexDirection: 'row',
    //                 justifyContent: 'space-between',
    //                 alignItems: 'center',
    //             }}>
    //                 <View
    //                 style={{
    //                     flexDirection: 'row',
    //                 }}>
    //                     <Image style={{
    //                         width: 50,
    //                         height: 50,
    //                         borderRadius: 50 / 2,
    //                         marginRight: Padding.Medium,
    //                     }} source={{uri: item.image ? item.image : ''}}/>
    //                     <View
    //                     style={{

    //                     }}>
    //                         <Text 
    //                         style={{ 
    //                             marginLeft: Padding.Medium, 
    //                             color: colors.text.main,
    //                             fontFamily: Font.TitilliumWebRegular,
    //                             fontSize: FontSize.Medium
    //                         }}>{item.name}</Text>
    //                         <Text
    //                         style={{
    //                             color: colors.text.main,
    //                             marginLeft: Padding.Medium,
    //                             fontFamily: Font.TitilliumWebRegular,
    //                             fontSize: FontSize.Small
    //                         }}>Pris: {item.currentPrice}</Text>
    //                     </View>
    //                 </View>
    //                 {shoppingList.items[shoppingList.items.findIndex((existingItem) => existingItem.id === item.id)].quantity > 0 ? (
    //                     <View
    //                     style={{
    //                         flexDirection: 'row',
    //                     }}>
    //                         <TouchableOpacity
    //                         style={{
    //                             width: 30,
    //                             height: 30,
    //                             borderRadius: 30 / 2,
    //                             backgroundColor: colors.textCard.secondary,
    //                             marginRight: Padding.Small,
    //                         }}
    //                         onPress={() => removeItemFromList(item)}>
    //                             <Feather
    //                             name='minus'
    //                             size={30}
    //                             color={colors.text.main}/>
    //                         </TouchableOpacity>
    //                         <TouchableOpacity
    //                         style={{
    //                             width: 30,
    //                             height: 30,
    //                             borderRadius: 30 / 2,
    //                             backgroundColor: colors.textCard.secondary,
    //                             marginLeft: Padding.Small
    //                         }}
    //                         onPress={() => addItemToList(item)}>
    //                             <Feather
    //                             name='plus'
    //                             size={30}
    //                             color={colors.text.main}/>
    //                         </TouchableOpacity>
    //                     </View>
    //                 ): (
    //                     <TouchableOpacity
    //                     style={{
    //                         width: 30,
    //                         height: 30,
    //                         borderRadius: 30 / 2,
    //                         backgroundColor: colors.textCard.secondary,
    //                     }}
    //                     onPress={() => addItemToList(item)}>
    //                         <Feather
    //                         name='plus'
    //                         size={30}
    //                         color={colors.text.main}/>
    //                     </TouchableOpacity>
    //                 )}
    //             </View>
    //     </TouchableOpacity>
    // );

    // if(loading) {
    //     return (
    //         <ActivityIndicator/>
    //     )
    // }
    return (

        <CustomCardWithoutText
        style={{
            height: 400,            
        }}>
            <TextInput
                placeholder="Søk etter vare..."
                placeholderTextColor={colors.text.main}
                value={searchQuery}
                onChangeText={(query) => handleSearch(query)}
                style={{
                    backgroundColor: colors.textCard.main,
                    padding: Padding.XLarge,
                    borderBottomWidth: 0.5,
                    borderColor: colors.text.main,
                    borderRadius: 5
                }}
            />
            <FlatList
            data={kassalappItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            />
        </CustomCardWithoutText>
    );
};