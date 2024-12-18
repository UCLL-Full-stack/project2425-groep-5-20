import { Item } from "../model/item";
import database from "../util/database";

const getAllItems = async(): Promise<Item[]> => {
    try {
        const itemPrismas = await database.item.findMany();
        return itemPrismas.map((item) => Item.from(item));
    } catch (error) {
        console.error(error);
        throw new Error('Database error: Could not fetch all items, check server logs.')
    }
}

const getItemsFromShoppingList = async(shoppingListId: number): Promise<Item[]> => {
    try {
        const itemPrismas = await database.item.findMany({
            where: {
                shoppingListId: shoppingListId
            }
        });
        return itemPrismas.map((itemPrisma) => Item.from(itemPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Datebase error: Could not fetch all items of a certain shopping list, check server logs.');
    }
}

// Delete
const deleteItemsFromShoppingList = async(shoppingListId: number | undefined): Promise<void> => {
    try {
        await database.item.deleteMany({
            where: {
                ShoppingList: {
                    id: shoppingListId
                }
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error: Could not delete a shopping lists, check server logs');
    }
};

const deleteItem = async(itemId: number): Promise<void> => {
    try {
        await database.item.delete({
            where: {
                id: itemId
            }
        })

    } catch (error) {
        console.error(error);
        throw new Error('Database error: Could not delete a shopping lists, check server logs');
    }
}

export default {
    getAllItems,
    getItemsFromShoppingList,
    deleteItemsFromShoppingList,
    deleteItem,
}