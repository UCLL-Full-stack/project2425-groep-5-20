import ShoppingListService from "@/services/ShoppingListService";
import { useEffect, useState } from "react";

type Props = {
    familyId: number | undefined;
    addShoppingListToShoppingLists: any;
}

const addShoppingList: React.FC<Props> = ({familyId, addShoppingListToShoppingLists}: Props) => {
    const [showNameTextField, setShowNameTextField] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [nameError, setNameError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<string | null>();

    useEffect(() => {
        setEmail(JSON.parse(localStorage.getItem("loggedInUser") as string).email);
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    },[])
    
    const handleSelected = (bool: boolean) => {
        if (bool) {
            setShowNameTextField(true);
        } else {
            setShowNameTextField(false);
        }
    }

    const cleanError = () => {
        setNameError(null);
    }

    const validate = (): boolean => {
        let result = true;

        if (name?.trim() === '') {
            setNameError('Name is required.');
            result = false;
        }

        return result;
    }

    const addShoppingList = async(event: any) => {
        event.preventDefault();

        cleanError();
        if (!validate()) {
            return;
        }

        if (!familyId) {
            return;
        }

        const shoppingList = await ShoppingListService.createShoppingList(name, familyId.toString(), email);

        if (shoppingList) {
            setShowNameTextField(false);
            setName('');
            addShoppingListToShoppingLists(shoppingList);
            setStatusMessage('Shopping list added successfully!')
        }
    }

    return <>
    {loggedInUser && JSON.parse(loggedInUser).role != 'child' && (
        <>
            <button 
                onClick={() => handleSelected(!showNameTextField)}
                className="bg-[#66FCF1] hover:bg-[#45A29E] text-[#1F2833] font-bold py-2 px-4 rounded mb-5"
            >
                Add a new shopping list
            </button>
            {showNameTextField && (
                <div className="bg-gray-800 p-4 rounded-md shadow-md">
                    <form onSubmit={(e) => addShoppingList(e)} className="space-y-4">
                        <div>
                            <label id="name" className="block text-sm font-medium text-gray-300">Name</label>
                            <input 
                                id="shoppingList-name" 
                                type="text" 
                                value={name} 
                                onChange={(event) => setName(event.target.value)} 
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            />
                            {nameError && <p className="text-red-500 mt-2">{nameError}</p>}
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Add
                        </button>
                    </form>
                </div>
            )}
            {statusMessage && <p className="text-green-500 mt-4">{statusMessage}</p>}
        </>
    )}
    </>
}

export default addShoppingList;