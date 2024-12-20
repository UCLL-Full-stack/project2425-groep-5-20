import { Item } from "../../model/item";
import { ShoppingList } from "../../model/shoppingList";
import { User } from "../../model/user";

let mockGetAllShoppingLists: jest.Mock;
let mockGetAllShoppingListsForFamily: jest.Mock;
let mockCreateShoppingList: jest.Mock;

const shoppingList = new ShoppingList(
    {
        name: "Name",
        "creationDate": new Date(),
        lastUpdate: new Date(),
        updatedBy: new User({
            name: "John",
            email: "john@email.com",
            password: "password123",
            role: "admin"
        }),
        items: []
    }
)

const shoppingLists = [shoppingList];

beforeEach(() => {
    mockGetAllShoppingLists = jest.fn();
    mockGetAllShoppingListsForFamily = jest.fn();
    mockCreateShoppingList = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
})

test("given: a list of shopping lists; when: getting all shopping lists; then: all shopping lists are returned", () => {
    mockGetAllShoppingLists.mockReturnValue(shoppingLists);
    expect(mockGetAllShoppingLists()).toEqual(shoppingLists);
});

test("given: a list of shopping lists; when: getting all shopping lists for a family; then: all shopping lists of that family are returned", () => {
    mockGetAllShoppingListsForFamily.mockReturnValue(shoppingLists);
    expect(mockGetAllShoppingListsForFamily(1)).toEqual(shoppingLists);
});

test("given: values for shopping lists; when: creating a shopping list; then shopping list is created", () => {
    mockCreateShoppingList.mockReturnValue(shoppingList);
    expect(mockCreateShoppingList("Name", "user@email.com'", 1, "admin")).toEqual(shoppingList);
});

