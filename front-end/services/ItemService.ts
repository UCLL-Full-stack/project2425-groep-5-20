


const getToken = () => {
    return JSON.parse(localStorage.getItem("loggedInUser") as string)?.token;
  }

const getItemsFromShoppingList = async (shoppingListId: number) => {
    const token = getToken();
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL +`/items/${shoppingListId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })

        return await response.json();
    } catch (error) {
        console.error('Error fetching items for shopping List:', error);
        return [];
    }
}

const deleteItem = async(itemId: number, userEmail: string, shoppingListId: number) => {
    const token = getToken();
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL +`/items/remove`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({itemId, userEmail, shoppingListId})
        })

        return await response.json();
    } catch (error) {
        console.error('Error deleting item for shopping List:', error);
    }
}

export default {
    getItemsFromShoppingList,
    deleteItem,
}