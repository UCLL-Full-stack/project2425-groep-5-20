import { Family } from "@/types";
import AddShoppingList from "./AddShoppingList";

type Props = {
    family: Family | undefined;
}

const ShoppingListsOverview: React.FC<Props> = ({family}: Props) => {
    return <>
    <h1>Shopping Lists of {family?.name}</h1>
    <AddShoppingList></AddShoppingList>
    </>
}

export default ShoppingListsOverview;