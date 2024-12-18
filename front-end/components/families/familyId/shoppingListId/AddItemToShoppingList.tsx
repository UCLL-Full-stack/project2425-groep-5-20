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
        <form className="space-y-2 p-2 bg-[#1F2833] rounded-md shadow-md max-w-xs mx-auto" onSubmit={(e) => addingItemToShoppingList(e)}>
            <div>
                <label className="block text-sm font-medium text-gray-300" id="name">Name</label>
                <input
                    id="item-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-3 block w-full px-2 py-1 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                {nameError && <p className="text-red-500 mt-1 text-xs">{nameError}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300" id='quantity'>Quantity</label>
                <input 
                    id="item-quantity" 
                    type='number' 
                    min={0} 
                    value={quantity} 
                    onChange={(event) => setQuantity(parseInt(event.target.value))}
                    className="mt-3 mb-3 block w-full px-2 py-1 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                {quantityError && <p className="text-red-500 mt-1 text-xs">{quantityError}</p>}
            </div>
            <button 
                type='submit'
                className="w-full py-1 px-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            >
                Add item
            </button>
        </form>
    </>
}

export default addItemToShoppingList;