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
    <div className="">
        <div className="flex flex-col items-center">
        <h1 className="text-2xl text-white mb-4">Shopping Lists of {family?.name}</h1>
        <AddShoppingList familyId={family?.id} addShoppingListToShoppingLists={addShoppingListToShoppingLists}></AddShoppingList>
        </div>
        <div className="container mx-auto p-4">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th scope="col" className="py-2 px-4 border-b">Name</th>
                        <th scope="col" className="py-2 px-4 border-b">Creation time</th>
                        <th scope="col" className="py-2 px-4 border-b">Last time updated</th>
                        <th scope="col" className="py-2 px-4 border-b">Last update by</th>
                        {loggedInUser && JSON.parse(loggedInUser).role != 'child' && <th scope="col" className="py-2 px-4 border-b">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                {shoppingLists.map((shoppingList, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b" onClick={() => router.push(`/families/${family?.id}/${shoppingList.id}`)}>{shoppingList.name}</td>
                        <td className="py-2 px-4 border-b" onClick={() => router.push(`/families/${family?.id}/${shoppingList.id}`)}>{shoppingList.creationDate?.slice(0,10)}  {shoppingList.creationDate?.slice(11,16)}</td>
                        <td className="py-2 px-4 border-b" onClick={() => router.push(`/families/${family?.id}/${shoppingList.id}`)}>{shoppingList.lastUpdate?.slice(0,10)}  {shoppingList.lastUpdate?.slice(11,16)}</td>
                        <td className="py-2 px-4 border-b" onClick={() => router.push(`/families/${family?.id}/${shoppingList.id}`)}>{shoppingList.updatedBy?.name}</td>
                        {loggedInUser && JSON.parse(loggedInUser).role != 'child' && (
                            <td className="py-2 px-4 border-b">
                                <button 
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={() => handleRemoveShoppingList(shoppingList.id)}
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

export default ShoppingListsOverview;