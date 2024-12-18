// GET

import { Family } from "../model/family";
import { Item } from "../model/item";
import { ShoppingList } from "../model/shoppingList";
import { User } from "../model/user";
import database from "../util/database";

const getAllShoppingLists = async(): Promise<ShoppingList[]> => {
    try {
        const shoppingListPrismas = await database.shoppingList.findMany({
            include: {items: true, updatedBy: true, family: true}
        });
        return shoppingListPrismas.map((shoppingListPrisma) => ShoppingList.from(shoppingListPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error: Could not fetch all shopping lists, check server logs.')
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
        throw new Error('Database error: Could not fetch all shopping lists of certain family, check server logs.')
    }
}

// POST //

const createShoppingList = async(name: string, updatedBy: User, family: Family): Promise<ShoppingList> => {
    try {
        const shoppingListPrisma = await database.shoppingList.create({
            data: {
                name: name,
                creationDate: new Date().toISOString(),
                lastUpdate: new Date().toISOString(),
                updatedBy: {connect: {id: updatedBy.getId()}},
                family: {connect: {id: family.getId()}}
            },
            include: {updatedBy: true, items: true}
        });

        return ShoppingList.from(shoppingListPrisma);

    } catch (error) {
        console.error(error);
        throw new Error("Database error: Could not create a shopping list, check server logs.")
    }

}

// Put

const addItemToShoppingList = async(shoppingListId: number, item: Item, updatedBy: User): Promise<ShoppingList> => {
    try {
        const shoppingListPrisma = await database.shoppingList.update({
            where: {
                id: shoppingListId
            },
            data: {
                lastUpdate: new Date().toISOString(),
                updatedBy: {connect: {id: updatedBy.getId()}},
                items: {
                    create: {
                        name: item.getName(),
                        quantity: item.getQuantity()
                    }
                }
            },
            include: {updatedBy: true, items: true}
        })
        return ShoppingList.from(shoppingListPrisma);


    } catch (error) {
        console.error(error);
        throw new Error("Database error: Could not add item to shopping list, check server logs.");
    }
}

const removeItemFromShoppingList = async(shoppingListId: number, updatedBy: User): Promise<ShoppingList> => {
    try {
        const shoppingListPrisma = await database.shoppingList.update({
            where: {
                id: shoppingListId
            },
            data: {
                lastUpdate: new Date().toISOString(),
                updatedBy: {connect: {id: updatedBy.getId()}},
            },
            include: {updatedBy: true, items: true}
        })
        return ShoppingList.from(shoppingListPrisma);


    } catch (error) {
        console.error(error);
        throw new Error("Database error: Could not add item to shopping list, check server logs.");
    }
}


// Delete
const deleteShoppingList = async(familyId: number): Promise<void> => {
    try {
        await database.shoppingList.deleteMany({
            where: {
                family: {
                    id: familyId
                }
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error: Could not delete a shopping lists, check server logs');
    }
};


export default {
    getAllShoppingLists,
    getAllShoppingListsForFamily,
    createShoppingList,
    addItemToShoppingList,
    deleteShoppingList,
    removeItemFromShoppingList,
}