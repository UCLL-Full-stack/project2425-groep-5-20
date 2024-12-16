import { Item } from "../model/item";
import itemDb from "../repository/item.db";

const getAllItems = async(): Promise<Item[]> => {
    return itemDb.getAllItems();
}

export default {
    getAllItems,
}