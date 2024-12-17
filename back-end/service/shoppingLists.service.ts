import shoppingListDb from "../repository/shoppingList.db";
import { ShoppingList } from "../model/shoppingList";
import familyDb from "../repository/family.db";
import userDb from "../repository/user.db";

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

export default {
    getAllShoppingLists,
    getAllShoppingListsForFamily,
    createShoppingList,
}