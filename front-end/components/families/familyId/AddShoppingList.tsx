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
        setEmail(JSON.parse(sessionStorage.getItem("loggedInUser") as string).email);
        setLoggedInUser(sessionStorage.getItem('loggedInUser'));
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
    {loggedInUser && JSON.parse(loggedInUser).role != 'child' && <><button onClick={() => handleSelected(!showNameTextField)}> Add a new shopping list</button>
    {showNameTextField && 
        <div>
            <form onSubmit={(e) => addShoppingList(e)}>
                <label id="name">Name</label>
                <input id="shoppingList-name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
                <button type="submit">Add</button>
            </form>
            {nameError && <p>{nameError}</p>}
        </div>
    }
    {statusMessage && <p>{statusMessage}</p>}</>}
    </>
}

export default addShoppingList