import { Item } from "../model/item";
import itemDb from "../repository/item.db";
import shoppingListDb from "../repository/shoppingList.db";
import userDb from "../repository/user.db";

const getAllItems = async(): Promise<Item[]> => {
    return itemDb.getAllItems();
}


const getItemsFromShoppingList = async(shoppingListId:number): Promise<Item[]> => {
    return itemDb.getItemsFromShoppingList(shoppingListId);
}

const deleteItem = async(itemId: number, userEmail: string, shoppingListId: number) => {
    const user = await userDb.getUserByEmail(userEmail);
    if (!user) {
        throw new Error("Cannot find user with this email");
    }
    await itemDb.deleteItem(itemId);
    await shoppingListDb.removeItemFromShoppingList(shoppingListId, user);
}

export default {
    getAllItems,
    getItemsFromShoppingList,
    deleteItem,
}