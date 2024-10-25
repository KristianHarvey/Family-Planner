import React from "react";
import { useColor } from "../../../hooks/useColor"
import { ShoppingList } from "../../../models/shoppingList";
import { ShoppingListService } from "../../../api/services/shoppingListService";
import { FlatList, RefreshControl, View } from "react-native";
import { ShoppingListWidgetBase } from "../../widget/shoppingList/shoppingListWidget/ShoppingListWidgetBase";



export const ShoppingListList = () => {
    const { colors } = useColor();
    const [shoppingLists, setShoppingLists] = React.useState<ShoppingList[]>([]);
    const [limit, setLimit] = React.useState(20);
    const [page, setPage] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasMoreItems, setHasMoreItems] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
 
    const getShoppingListData = async() => {
        setIsLoading(true);
        const response = await ShoppingListService.getAllForCurrentUser(limit, page);
        if (response) {
            const newShoppingLists = response.data;
            const updatedShoppingLists = newShoppingLists.filter(newItem => !shoppingLists.some(oldItem => oldItem.id === newItem.id));
            setShoppingLists([...shoppingLists, ...updatedShoppingLists]);
            if (updatedShoppingLists.length < limit) {
                setHasMoreItems(false); // No more items to load
            } else {
                setPage(page + 1); // Increment page for next pagination request
            }
        }
        setIsLoading(false);
    }

    const getData = React.useCallback(async () => {
        await getShoppingListData();
    }, [page]);

    React.useEffect(() => {
        getData();
    }, []);

    
    const renderItem = ({item}) => {
        return (
            <ShoppingListWidgetBase
            sideMargins
            shoppingList={item}/>
        )
    }

    const handleEndReached = () => {
        if (!isLoading && hasMoreItems) {
            getData();
        }
    };

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        await getShoppingListData();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [getShoppingListData]);

    return (
        <View>
            <FlatList
            contentContainerStyle={{flexGrow: 1, backgroundColor: colors.background.main}}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            data={shoppingLists}
            renderItem={renderItem}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}/>
        </View>
    )
}