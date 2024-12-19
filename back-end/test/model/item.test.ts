import { Item } from "../../model/item";

test(`given: Valid values for all fields; when: Item is created; then: Item is created successfully`, () => {
    const item = new Item({
        id: 1,
        name: "Apple",
        quantity: 10,
    });

    expect(item.getId()).toEqual(1);
    expect(item.getName()).toEqual("Apple");
    expect(item.getQuantity()).toEqual(10);
});

test(`given: empty name field; when: item is created; then: name error is thrown`, () => {
    expect(() => {
        new Item({
            id: 1,
            name: "",
            quantity: 10,
        })}).toThrow("Name must not be empty");
});

test(`given: Name contains only whitespace; when: Item is created; then: Name error is thrown`, () => {
    expect(() => {
        new Item({
            id: 1,
            name: "   ",
            quantity: 10,
        })}).toThrow("Name must not be empty");
});

test(`given: Quantity is less than 1; when: Item is created; then: Quantity error is thrown`, () => {
    expect(() => {
        new Item({
            id: 1,
            name: "Banana",
            quantity: 0,
        })}).toThrow("Quantity cannot be 0");
});

test(`given: quantity is negative; when: item is created; then: quantity error is thrown`, () => {
    expect(() => {
        new Item({
            id: 1,
            name: "Mango",
            quantity: -5,
        })}).toThrow("Quantity cannot be 0");
});