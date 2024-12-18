import shoppingListDb from "../repository/shoppingList.db";
import { ShoppingList } from "../model/shoppingList";
import familyDb from "../repository/family.db";
import userDb from "../repository/user.db";
import { Item } from "../model/item";
import itemDb from "../repository/item.db";

const getAllShoppingLists = async(): Promise<ShoppingList[]> => {
    return await shoppingListDb.getAllShoppingLists();
}

const getAllShoppingListsForFamily = async(familyId: number): Promise<ShoppingList[]> => {
    if (!await familyDb.getFamilyById(familyId)) {
        throw new Error("No family with this ID exists!")
    }

    return await shoppingListDb.getAllShoppingListsForFamily(familyId);
}

const createShoppingList = async(name: string, userEmail: string, familyId: number): Promise<ShoppingList> => {
    const user = await userDb.getUserByEmail(userEmail);
    const family = await familyDb.getFamilyById(parseInt(familyId.toString()));
    if (!user) {
        throw new Error("No user with this email exist.");
    }
    if (!family) {
        throw new Error("No family with this ID exists.");
    }

    return await shoppingListDb.createShoppingList(name, user, family);

}

const addItemToShoppingList = async(shoppingListId: number, item: any, userEmail: string): Promise<ShoppingList> => {
    const user = await userDb.getUserByEmail(userEmail);
    if (!user) {
        throw new Error("User with this email does not exist.");
    }

    const {name, quantity} = item;
    

    const new_item = new Item({name, quantity})
    
    return shoppingListDb.addItemToShoppingList(shoppingListId, new_item, user);
}

const deleteShoppingList = async(shoppingListId: number) => {
    await itemDb.deleteItemsFromShoppingList(shoppingListId);
    await shoppingListDb.deleteShoppingList(shoppingListId);
}

export default {
    getAllShoppingLists,
    getAllShoppingListsForFamily,
    createShoppingList,
    addItemToShoppingList,
    deleteShoppingList,
}