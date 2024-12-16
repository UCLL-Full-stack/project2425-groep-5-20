// GET

import { ShoppingList } from "../model/shoppingList";
import database from "../util/database";

const getAllShoppingLists = async(): Promise<ShoppingList[]> => {
    try {
        const shoppingListPrismas = await database.shoppingList.findMany({
            include: {items: true, updatedBy: true, family: true}
        });
        return shoppingListPrismas.map((shoppingListPrisma) => ShoppingList.from(shoppingListPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error: Could not fetch all users, check server logs.')
    }
}

const getAllShoppingListsForFamily = async(familyId: number): Promise<ShoppingList[]> => {
    try {
        const shoppingListPrismas = await database.shoppingList.findMany({
            include: {items: true, updatedBy: true, family: true},
            where: {
                family: {
                    id: familyId
                }
            }
        });
        return shoppingListPrismas.map((shoppingListPrisma) => ShoppingList.from(shoppingListPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error: Could not fetch all users, check server logs.')
    }
}


export default {
    getAllShoppingLists,
    getAllShoppingListsForFamily
}