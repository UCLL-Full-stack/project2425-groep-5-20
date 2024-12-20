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
import ItemOverview from '@components/families/familyId/shoppingListId/ItemOverview'

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
        (): Promise<Item[]> => getItemsFromShoppingList(parseInt(shoppingListId as string))
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


    return <>
        <title>{t("families.itemOverview.title")}</title>
        <Header />
        {loggedInUser && <div className="bg-[#1F2833] min-h-screen p-4">
            <h1 className="text-center text-2xl text-white mb-4">{t("families.itemOverview.title")}</h1>
            <AddItemToShoppingList addItemToShoppingList={addItemToShoppingList} />
            {status && <p className="text-green-500 text-center mt-2">{status}</p>}
            <div className="container mx-auto p-4">
                <ItemOverview loggedInUser={loggedInUser} shoppingListId={shoppingListId as string}/>
            </div>
          </div> || <h1 className="text-center text-[#ff0000] mt-10">{t("login.status.noAccess")}</h1>}
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