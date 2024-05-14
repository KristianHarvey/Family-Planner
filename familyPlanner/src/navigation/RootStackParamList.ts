import { ShoppingList } from "../models/shoppingList";

export type RootStackParamList = {
    ShoppingListScreen: undefined;
    ShoppingListViewScreen: { shoppingList: ShoppingList};
    ShoppingListEditScreen: { shoppingList: ShoppingList};
}
