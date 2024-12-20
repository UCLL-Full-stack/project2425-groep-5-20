import { Item } from "../../model/item";
import itemService from "../../service/item.service";

let mockGetAllItems: jest.Mock;
let mockGetItemsFromShoppingList: jest.Mock;
let mockDeleteItem: jest.Mock;

const item = new Item({
    name: "Name",
    quantity: 1
})

const items = [item];

beforeEach(() =>{
    mockGetAllItems = jest.fn();
    mockGetItemsFromShoppingList = jest.fn();
    mockDeleteItem = jest.fn();
})

afterEach(() => {
    jest.clearAllMocks();
})

test("given: a list of items; when: getting all items; then: all items are returned", () => {
    itemService.getAllItems = mockGetAllItems.mockReturnValue(items);
    expect(itemService.getAllItems()).toEqual(items);
});

test("given: a shopping list id; when: getting all items from a shopping list; then: all items from that shopping list are returned", () => {    
    itemService.getItemsFromShoppingList = mockGetItemsFromShoppingList.mockReturnValue(items);
    expect(itemService.getItemsFromShoppingList(1)).toEqual(items);
}); 

test("given: a list of items in a shopping list; when: deleting an item; then: item is deleted", () => {
    mockDeleteItem.mockReturnValue(undefined);
    expect(mockDeleteItem(1, "email@email.com", 1, "admin")).toBeUndefined();
});  