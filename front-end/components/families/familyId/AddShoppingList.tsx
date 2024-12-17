import { useState } from "react";

const addShoppingList: React.FC = () => {
    const [showNameTextField, setShowNameTextField] = useState<boolean>(false);
    const [name, setName] = useState<string | undefined>('');
    const [nameError, setNameError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

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

    const addShoppingList = (event: any) => {
        event.preventDefault();

        cleanError();
        if (!validate()) {
            return;
        }

        setShowNameTextField(false);
        setName('');
        setStatusMessage('Shopping list added successfully!')
        

    }

    return <>
    <button onClick={() => handleSelected(!showNameTextField)}> Add a new shopping list</button>
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
    {statusMessage && <p>{statusMessage}</p>}
    </>
}

export default addShoppingList