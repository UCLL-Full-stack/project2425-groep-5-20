import { Item } from "@/types";
import { useState } from "react";

type Props = {
    addItemToShoppingList: any
}

const addItemToShoppingList: React.FC<Props> = ({addItemToShoppingList}: Props) => {
    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [nameError, setNameError] = useState<string>('');
    const [quantityError, setQuantityError] = useState<string>('');

    const clearErrors = () => {
        setNameError('');
        setQuantity(0);
    }
    
    const validate = (): boolean => {
        let result = true;

        if (name?.trim() === '') {
            setNameError('Name is required.');
            result = false;
        }

        if (quantity <= 0) {
            setQuantityError('You should add more than 0 quantity of an item.');
            result = false;
        }

        return result;
    }

    const addingItemToShoppingList = (event: any) => {
        event.preventDefault();

        clearErrors();
        if (!validate()) {
            return;
        }
        
        const item: Item = {name, quantity};
        
        setName('');

        addItemToShoppingList(item);
    }


    return <>
    <form onSubmit={(e) => addingItemToShoppingList(e)}>
    <label id="name">Name</label>
    <input id="item-name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
    <label id='quantity'>Quantity</label>
    <input id="item-name" type='number' min={0} value={quantity} onChange={(event) => setQuantity(parseInt(event.target.value))} />
    <button type='submit'>Add item</button>
    </form>
    {nameError && <p>{nameError}</p>}
    {quantityError && <p>{quantityError}</p>}
    </>
}

export default addItemToShoppingList;