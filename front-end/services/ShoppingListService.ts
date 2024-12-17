import { ShoppingList } from "@/types";



const getToken = () => {
    return JSON.parse(sessionStorage.getItem("loggedInUser") as string)?.token;
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

export default {
    getAllShoppingListsForFamily,
    createShoppingList,
}