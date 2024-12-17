import { Family, ShoppingList } from "@/types";
import AddShoppingList from "./AddShoppingList";
import { useEffect, useState } from "react";
import ShoppingListService from "@/services/ShoppingListService";

type Props = {
    family: Family | undefined;
}

const ShoppingListsOverview: React.FC<Props> = ({family}: Props) => {
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

    const getShoppingListsForFamily = async(familyId: number | undefined) => {
        if (!familyId) {
            return;
        }
        const shoppingListsJson = await ShoppingListService.getAllShoppingListsForFamily(familyId);
        setShoppingLists(shoppingListsJson);
    }

    const addShoppingListToShoppingLists = (shoppingList: ShoppingList) => {
        setShoppingLists([shoppingList, ...shoppingLists])
    }

    useEffect(() => {
        getShoppingListsForFamily(family?.id);
    }, [])

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
                <td>{shoppingList.name}</td>
                <td>{shoppingList.creationDate?.slice(0,10)}  {shoppingList.creationDate?.slice(11,16)}</td>
                <td>{shoppingList.lastUpdate?.slice(0,10)}  {shoppingList.lastUpdate?.slice(11,16)}</td>
                <td>{shoppingList.updatedBy?.name}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </>
}

export default ShoppingListsOverview;