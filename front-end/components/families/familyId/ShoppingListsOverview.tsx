import { Family } from "@/types";

type Props = {
    family: Family | undefined;
}

const ShoppingListsOverview: React.FC<Props> = ({family}: Props) => {
    return <>
    <h1>Shopping Lists of {family?.name}</h1>
    </>
}

export default ShoppingListsOverview;