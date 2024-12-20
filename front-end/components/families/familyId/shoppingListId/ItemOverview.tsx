import ItemService from "@/services/ItemService";
import { Item } from "@/types";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";


type Props = {
  shoppingListId: string
  loggedInUser: string | null | undefined
}

const ItemOverview: React.FC<Props> = ({shoppingListId, loggedInUser}: Props) => {
    const {t} = useTranslation();
    
    const getItemsFromShoppingList = async (shoppingListId: number | undefined) => {
      if (!shoppingListId) {
          return;
      }
      const response = await ItemService.getItemsFromShoppingList(shoppingListId);
      return response;
  }

    useInterval(() => {
      mutate(
          "items",
          getItemsFromShoppingList(parseInt(shoppingListId as string)));
    }, 500);

    const {data: items, isLoading, error} = useSWR(
        "items",
        (): Promise<Item[]> => getItemsFromShoppingList(parseInt(shoppingListId as string))
    );

      const handleDeleteItem = async (itemId: number | undefined) => {
          if (!itemId) {
              return;
          }
  
          if (window.confirm(t("families.itemOverview.status.areYouSure"))) {
              const userEmail = JSON.parse(localStorage.getItem('loggedInUser') as string).email;
  
              await ItemService.deleteItem(itemId, userEmail, parseInt(shoppingListId as string));
              mutate("items", getItemsFromShoppingList(parseInt(shoppingListId as string)));
          }
  
          getItemsFromShoppingList(parseInt(shoppingListId as string));
      }
  

    return <>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th scope="col" className="py-2 px-4 border-b">{t("families.itemOverview.name")}</th>
                    <th scope="col" className="py-2 px-4 border-b">{t("families.itemOverview.quantity")}</th>
                    {loggedInUser && JSON.parse(loggedInUser).role !== 'child' && (
                      <th scope="col" className="py-2 px-4 border-b">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {error && <tr><td colSpan={3} className="text-center text-red-500 mt-4">Failed to load items</td></tr>}
                  {isLoading && <tr><td colSpan={3} className="text-center text-white mt-4">Loading...</td></tr>}
                  {items && items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{item.name}</td>
                      <td className="py-2 px-4 border-b">{item.quantity}</td>
                      {loggedInUser && JSON.parse(loggedInUser).role !== 'child' && (
                        <td className="py-2 px-4 border-b">
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            {t("families.itemOverview.button.remove")}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
    </>
}

export default ItemOverview;