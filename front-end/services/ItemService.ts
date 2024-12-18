


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

export default {
    getItemsFromShoppingList,
}