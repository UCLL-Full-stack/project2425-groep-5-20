import ItemService from "@/services/ItemService";
import ShoppingListService from "@/services/ShoppingListService";
import { Item } from "@/types";
import AddItemToShoppingList from "@components/families/familyId/shoppingListId/AddItemToShoppingList";
import Header from "@components/header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const shoppingListId: React.FC = () => {
    const router = useRouter();
    const { familyId, shoppingListId } = router.query;

    const [items, setItems] = useState<Item[]>([]);
    const [status, setStatus] = useState<string>('');
    const [loggedInUser, setLoggedInUser] = useState<string | null>();

    const getItemsFromShoppingList = async (shoppingListId: number | undefined) => {
        if (!shoppingListId) {
            return;
        }
        const itemsJSON = await ItemService.getItemsFromShoppingList(shoppingListId);
        setItems(itemsJSON);
    }

    useEffect(() => {
        getItemsFromShoppingList(parseInt(shoppingListId as string));
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, [shoppingListId, items]);

    const addItemToShoppingList = async (item: Item) => {
        const userEmail = JSON.parse(localStorage.getItem('loggedInUser') as string).email;

        await ShoppingListService.addItemToShoppingList(parseInt(shoppingListId as string), item, userEmail);

        getItemsFromShoppingList(parseInt(shoppingListId as string));
        setStatus('Item successfully added to shopping list.');

        setTimeout(() => {
            setStatus('');
        }, 2000);
    }

    const handleDeleteItem = async (itemId: number | undefined) => {
        if (!itemId) {
            return;
        }

        if (window.confirm("Are you sure you want to delete this item from the shopping list?")) {
            const userEmail = JSON.parse(localStorage.getItem('loggedInUser') as string).email;

            await ItemService.deleteItem(itemId, userEmail, parseInt(shoppingListId as string));
        }

        getItemsFromShoppingList(parseInt(shoppingListId as string));
    }

    return <>
        <Header />
        <div className="bg-[#1F2833] min-h-screen p-4">
            <h1 className="text-center text-2xl text-white mb-4">Items in the Shopping List</h1>
            <AddItemToShoppingList addItemToShoppingList={addItemToShoppingList} />
            {status && <p className="text-green-500 text-center mt-2">{status}</p>}
            <div className="container mx-auto p-4">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th scope="col" className="py-2 px-4 border-b">Item Name</th>
                            <th scope="col" className="py-2 px-4 border-b">Quantity</th>
                            {loggedInUser && JSON.parse(loggedInUser).role != 'child' && (
                                <th scope="col" className="py-2 px-4 border-b">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{item.name}</td>
                                <td className="py-2 px-4 border-b">{item.quantity}</td>
                                {loggedInUser && JSON.parse(loggedInUser).role != 'child' && (
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => handleDeleteItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default shoppingListId;