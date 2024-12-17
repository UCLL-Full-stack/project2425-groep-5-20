import ItemService from "@/services/ItemService";
import { Item, ShoppingList } from "@/types";
import Header from "@components/header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const shoppingListId: React.FC= () => {
    const router = useRouter();
    const {familyId, shoppingListId} = router.query

    const [items, setItems] = useState<Item[]>([]);

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

    return <>
    <Header/>
    <h1>Items inside of the shopping list.</h1>
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