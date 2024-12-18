import { Family, ShoppingList } from "@/types";
import AddShoppingList from "./AddShoppingList";
import { useEffect, useState } from "react";
import ShoppingListService from "@/services/ShoppingListService";
import { useRouter } from "next/router";

type Props = {
    family: Family | undefined;
}

const ShoppingListsOverview: React.FC<Props> = ({family}: Props) => {
    const router = useRouter();

    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<string | null>();

    const getShoppingListsForFamily = async(familyId: number | undefined) => {
        if (!familyId) {
            return;
        }
        const shoppingListsJson = await ShoppingListService.getAllShoppingListsForFamily(familyId);

        // Sorts the shopping list on date (when you update them in the DB, they shuffle)
        shoppingListsJson.sort((a, b) => a.creationDate && b.creationDate ? a.creationDate.localeCompare(b.creationDate) : 0);
        
        setShoppingLists(shoppingListsJson);
    }

    const addShoppingListToShoppingLists = (shoppingList: ShoppingList) => {
        setShoppingLists([shoppingList, ...shoppingLists])
    }

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
        getShoppingListsForFamily(family?.id);
    }, [shoppingLists])

    const handleRemoveShoppingList = async(shoppingListId: number | undefined) => {
        if (!shoppingListId) {
            return;
        }
        if (window.confirm("Are you sure you want to remove this shopping list?")){

            await ShoppingListService.deleteShoppingList(shoppingListId);

            getShoppingListsForFamily(family?.id);
        }
    }

    return <>
    <h1>Shopping Lists of {family?.name}</h1>
    <AddShoppingList familyId={family?.id} addShoppingListToShoppingLists={addShoppingListToShoppingLists}></AddShoppingList>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Creation time</th>
                <th>Last time updated</th>
                <th>Last update by</th>
            </tr>
        </thead>
        <tbody>
        {shoppingLists.map((shoppingList, index) => (
            <tr key={index} className="shoppingList">
                <td onClick={() => router.push(`/families/${family?.id}/${shoppingList.id}`)}>{shoppingList.name}</td>
                <td onClick={() => router.push(`/families/${family?.id}/${shoppingList.id}`)}>{shoppingList.creationDate?.slice(0,10)}  {shoppingList.creationDate?.slice(11,16)}</td>
                <td onClick={() => router.push(`/families/${family?.id}/${shoppingList.id}`)}>{shoppingList.lastUpdate?.slice(0,10)}  {shoppingList.lastUpdate?.slice(11,16)}</td>
                <td onClick={() => router.push(`/families/${family?.id}/${shoppingList.id}`)}>{shoppingList.updatedBy?.name}</td>
                {loggedInUser && JSON.parse(loggedInUser).role != 'child' && <td><button onClick={() => handleRemoveShoppingList(shoppingList.id)}>Remove</button></td>}
            </tr>
        ))}
        </tbody>
    </table>
    </>
}

export default ShoppingListsOverview;