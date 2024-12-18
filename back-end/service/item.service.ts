import { Item } from "../model/item";
import itemDb from "../repository/item.db";
import shoppingListDb from "../repository/shoppingList.db";

const getAllItems = async(): Promise<Item[]> => {
    return itemDb.getAllItems();
}


const getItemsFromShoppingList = async(shoppingListId:number): Promise<Item[]> => {
    return itemDb.getItemsFromShoppingList(shoppingListId);
}
export default {
    getAllItems,
    getItemsFromShoppingList,
}