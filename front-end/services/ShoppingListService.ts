import { Item, ShoppingList } from "@/types";



const getToken = () => {
    return JSON.parse(localStorage.getItem("loggedInUser") as string)?.token;
}

// Get
const getAllShoppingListsForFamily = async(familyId: number): Promise<ShoppingList[]> => {
    const token = getToken();
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingLists/family/${familyId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        });
        return await response.json();

    } catch (error) {
        console.error('Error getting all shopping list:', error);
        return [];
    }
}


// Post

const createShoppingList = async (name: string, familyId: string, userEmail: string): Promise<ShoppingList | null> => {
    const token = getToken();
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/shoppingLists', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({name, userEmail, familyId}),
        });

        if (!response.ok) {
            throw new Error('Failed to create a shopping list');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating shopping List:', error);
        return null;
    }
};

const addItemToShoppingList = async(shoppingListId: number, item: Item, userEmail: string): Promise<ShoppingList> => {
    const token = getToken();
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingLists/${shoppingListId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({item, userEmail})
        });
        return await response.json();

    } catch (error) {
        throw new Error('Error adding item to shopping list:' + error);
    }
}

// Delete
const deleteShoppingList = async(shoppingListId: number) => {
    const token = getToken();
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingLists/${shoppingListId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        return await response.json();

    } catch (error) {
        throw new Error('Error deleting shopping list:' + error);
    }
}

export default {
    getAllShoppingListsForFamily,
    createShoppingList,
    addItemToShoppingList,
    deleteShoppingList,
}