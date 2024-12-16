import shoppingListDb from "../repository/shoppingList.db";
import { ShoppingList } from "../model/shoppingList";
import familyDb from "../repository/family.db";

const getAllShoppingLists = async(): Promise<ShoppingList[]> => {
    return await shoppingListDb.getAllShoppingLists();
}

const getAllShoppingListsForFamily = async(familyId: number): Promise<ShoppingList[]> => {
    if (!await familyDb.getFamilyById(familyId)) {
        throw new Error("No family with this ID exists!")
    }

    return await shoppingListDb.getAllShoppingListsForFamily(familyId);
}

export default {
    getAllShoppingLists,
    getAllShoppingListsForFamily,
}