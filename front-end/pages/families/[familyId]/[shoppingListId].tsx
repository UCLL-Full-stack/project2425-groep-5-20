import ItemService from "@/services/ItemService";
import ShoppingListService from "@/services/ShoppingListService";
import { Item, ShoppingList } from "@/types";
import AddItemToShoppingList from "@components/families/familyId/shoppingListId/AddItemToShoppingList";
import Header from "@components/header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const shoppingListId: React.FC= () => {
    const router = useRouter();
    const {familyId, shoppingListId} = router.query

    const [items, setItems] = useState<Item[]>([]);
    const [status, setStatus] = useState<string>('');

    const getItemsFromShoppingList = async(shoppingListId: number | undefined) => {
        if (!shoppingListId) {
            return;
        }
        const itemsJSON = await ItemService.getItemsFromShoppingList(shoppingListId);
        setItems(itemsJSON);
    }

    useEffect(() => {
        getItemsFromShoppingList(parseInt(shoppingListId as string));
    },[])

    const addItemToShoppingList = async(item: Item) => {
        const userEmail = JSON.parse(localStorage.getItem('loggedInUser') as string).email;

        const shoppingListItem = await ShoppingListService.addItemToShoppingList(parseInt(shoppingListId as string),item,userEmail);

        getItemsFromShoppingList(parseInt(shoppingListId as string));
        setStatus('Item successfully added to shopping list.');
        
        setTimeout(()=> {
            setStatus('');
        }, 2000);
    }

    return <>
    <Header/>
    <h1>Items inside of the shopping list.</h1>
    <AddItemToShoppingList addItemToShoppingList={addItemToShoppingList}/>
    {status && <p>{status}</p>}
    <table>
        <thead>
            <tr>
                <th>Item name</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
            {items.map((item, idx) => (
                <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
}

export default shoppingListId;