import ItemService from "@/services/ItemService";
import ShoppingListService from "@/services/ShoppingListService";
import { Item } from "@/types";
import AddItemToShoppingList from "@components/families/familyId/shoppingListId/AddItemToShoppingList";
import Header from "@components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import nextI18nextConfig from "../../../../next-i18next.config";

const shoppingListId: React.FC = () => {
    const {t} = useTranslation();
    const router = useRouter();
    const { familyId, shoppingListId } = router.query;

    const [status, setStatus] = useState<string>('');
    const [loggedInUser, setLoggedInUser] = useState<string | null>();

    const getItemsFromShoppingList = async (shoppingListId: number | undefined) => {
        if (!shoppingListId) {
            return;
        }
        const response = await ItemService.getItemsFromShoppingList(shoppingListId);
        return response;
    }

    const {data: items, isLoading, error} = useSWR(
        "items",
        () => getItemsFromShoppingList(parseInt(shoppingListId as string))
    );

    useInterval(() => {
        mutate(
            "items",
            getItemsFromShoppingList(parseInt(shoppingListId as string)));
    }, 500);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, [shoppingListId, items]);

    const addItemToShoppingList = async (item: Item) => {
        const userEmail = JSON.parse(localStorage.getItem('loggedInUser') as string).email;

        await ShoppingListService.addItemToShoppingList(parseInt(shoppingListId as string), item, userEmail);

        getItemsFromShoppingList(parseInt(shoppingListId as string));
        setStatus(t("families.itemOverview.status.succes"));

        setTimeout(() => {
            setStatus('');
        }, 2000);

        mutate("items", getItemsFromShoppingList(parseInt(shoppingListId as string)));
    }

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
        <title>{t("families.itemOverview.title")}</title>
        <Header />
        <div className="bg-[#1F2833] min-h-screen p-4">
            <h1 className="text-center text-2xl text-white mb-4">{t("families.itemOverview.title")}</h1>
            <AddItemToShoppingList addItemToShoppingList={addItemToShoppingList} />
            {status && <p className="text-green-500 text-center mt-2">{status}</p>}
            <div className="container mx-auto p-4">
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
            </div>
          </div>
        </>
}

export const getServerSideProps = async (content: { locale: any; }) => {
  const { locale } = content;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18nextConfig)),
    },
  };
};

export default shoppingListId;