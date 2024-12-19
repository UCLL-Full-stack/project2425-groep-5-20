import { ShoppingList } from "../../model/shoppingList";
import { Item } from "../../model/item";
import { User } from "../../model/user";

test(`given: Valid values for all fields; when: Shopping list is created; then: Shopping list is created successfullyy`, () => {
    const items = [
        new Item({ id: 1, name: "Apple", quantity: 10 }),
        new Item({ id: 2, name: "Banana", quantity: 5 }),
    ];

    const user = new User({
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "admin",
    });

    const shoppingList = new ShoppingList({
        id: 1,
        name: "Groceries",
        creationDate: new Date("2023-01-01"),
        lastUpdate: new Date("2023-01-02"),
        updatedBy: user,
        items,
    });

    expect(shoppingList.getId()).toEqual(1);
    expect(shoppingList.getName()).toEqual("Groceries");
    expect(shoppingList.getCreationDate()).toEqual(new Date("2023-01-01"));
    expect(shoppingList.getLastUpdate()).toEqual(new Date("2023-01-02"));
    expect(shoppingList.getUpdatedBy()).toEqual(user);
    expect(shoppingList.getItems()).toEqual(items);
});

test(`given: Empty name field; when: Shopping list is created; then: Name error is thrown`, () => {
    const items = [
        new Item({ id: 1, name: "Eggs", quantity: 12 }),
    ];

    const user = new User({
        id: 3,
        name: "Admin",
        email: "admin@example.com",
        password: "adminPass123",
        role: "admin",
    });

    expect(() => {
        new ShoppingList({
            name: "",
            creationDate: new Date("2023-01-10"),
            lastUpdate: new Date("2023-01-11"),
            updatedBy: user,
            items,
        })}).toThrow("Item name must not empty.");
});

test(`given: Creation date in the future; when: Shopping list is created; then: Creation date error is thrown`, () => {
    const items = [
        new Item({ id: 1, name: "Bread", quantity: 1 }),
    ];

    const user = new User({
        id: 4,
        name: "Owner",
        email: "owner@example.com",
        password: "ownerPass123",
        role: "child",
    });

    expect(() => {
        new ShoppingList({
            name: "Bakery Items",
            creationDate: new Date("2099-01-10"),
            lastUpdate: new Date("2023-01-11"),
            updatedBy: user,
            items,
        })}).toThrow("The creation date can't be before today's date.");
});

test(`given: Last update in the future; when: Shopping list is created; then: Last update error is thrown`, () => {
    const items = [
        new Item({ id: 2, name: "Cheese", quantity: 3 }),
    ];

    const user = new User({
        id: 5,
        name: "Updater",
        email: "updater@example.com",
        password: "updatePass123",
        role: "admin",
    });

    expect(() => {
        new ShoppingList({
            name: "Dairy",
            creationDate: new Date("2023-01-10"),
            lastUpdate: new Date("2099-01-11"),
            updatedBy: user,
            items,
        })}).toThrow("The last update can't be in the future.");
});

test(`given: Last update before creation date; when: Shopping list is created; then: Last update error is thrown`, () => {
    const items = [
        new Item({ id: 3, name: "Butter", quantity: 2 }),
    ];

    const user = new User({
        id: 6,
        name: "Checker",
        email: "checker@example.com",
        password: "checkPass123",
        role: "parent",
    });

    expect(() => {
        new ShoppingList({
            name: "Spreads",
            creationDate: new Date("2023-01-11"),
            lastUpdate: new Date("2023-01-10"),
            updatedBy: user,
            items,
        })}).toThrow("The last update can't occur before the creation date.");
});

test(`given: A valid shopping list; when: addItem is called; then: Item is added to the list`, () => {
    const items = [
        new Item({ id: 1, name: "Juice", quantity: 4 }),
    ];

    const user = new User({
        id: 7,
        name: "Adder",
        email: "adder@example.com",
        password: "addPass123",
        role: "parent",
    });

    const shoppingList = new ShoppingList({
        name: "Beverages",
        creationDate: new Date("2023-01-01"),
        lastUpdate: new Date("2023-01-02"),
        updatedBy: user,
        items,
    });

    const newItem = new Item({ id: 2, name: "Soda", quantity: 6 });
    shoppingList.addItem(newItem);

    expect(shoppingList.getItems().length).toEqual(2);
    expect(shoppingList.getItems()).toContain(newItem);
});