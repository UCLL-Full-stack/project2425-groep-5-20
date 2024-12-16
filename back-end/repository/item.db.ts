import { Item } from "../model/item";
import database from "../util/database";

const getAllItems = async(): Promise<Item[]> => {
    try {
        const itemPrismas = await database.item.findMany();
        return itemPrismas.map((item) => Item.from(item));
    } catch (error) {
        console.error(error);
        throw new Error('Database error: Could not fetch all items, check server logs.')
    }
}

export default {
    getAllItems,
}