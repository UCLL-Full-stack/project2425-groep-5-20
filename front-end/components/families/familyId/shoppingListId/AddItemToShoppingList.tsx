import { Item } from "@/types";
import { useTranslation } from "next-i18next";
import { useState } from "react";

type Props = {
    addItemToShoppingList: any
}

const addItemToShoppingList: React.FC<Props> = ({addItemToShoppingList}: Props) => {
    const {t} = useTranslation();

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
            setNameError(t("families.itemOverview.status.nameError"));
            result = false;
        }

        if (quantity <= 0) {
            setQuantityError(t("families.itemOverview.status.quantityError"));
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
                <label className="block text-sm font-medium text-gray-300" id="name">{t("families.itemOverview.name")}</label>
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
                <label className="block text-sm font-medium text-gray-300" id='quantity'>{t("families.itemOverview.quantity")}</label>
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
                {t("families.itemOverview.button.add")}
            </button>
        </form>
    </>
}

export default addItemToShoppingList;