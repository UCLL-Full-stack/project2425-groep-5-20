import { User } from "../../model/user";

test(`given: valid values for all fields; 
    when: user is created; 
    then: fields are set correctly`, () => {
    const user = new User({
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    role: "admin",
    });

    expect(user.getId()).toEqual(1);
    expect(user.getName()).toEqual("John Doe");
    expect(user.getEmail()).toEqual("john.doe@example.com");
    expect(user.getPassword()).toEqual("password123");
    expect(user.getRole()).toEqual("admin");
});

test(`given: valid values; when: user is created; then: user is created successfully`, () => {
    const user = new User({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "securePass123",
    role: "admin",
    });

    expect(user.getId()).toBeUndefined();
    expect(user.getName()).toEqual("Jane Doe");
    expect(user.getEmail()).toEqual("jane.doe@example.com");
    expect(user.getPassword()).toEqual("securePass123");
    expect(user.getRole()).toEqual("admin");
});

test(`given: empty name field; when: user is created; then: name error is thrown`, () => {
    expect(() => {
    new User({
        id: 1,
        name: "",
        email: "invalid.name@example.com",
        password: "password123",
        role: "parent",
    })}).toThrow("Name must not empty.");
});

test(`given: invalid email format; when: user is created; then: email error is thrown`, () => {
expect(() => {
    new User({
        id: 1,
        name: "John Doe",
        email: "invalid-email",
        password: "password123",
        role: "parent",
    })}).toThrow("Email is not valid format.");
});

test(`given: password less than 8 characters; when: user is created; then: password error is thrown`, () => {
expect(() => {
    new User({
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        password: "short",
        role: "child",
    })}).toThrow("Password must be at least 8 characters long.");
});

test(`given: name contains only whitespace; when: user is created; then: empty name error is thrown`, () => {
    expect(() => {
    new User({
        id: 1,
        name: "   ",
        email: "john.doe@example.com",
        password: "password123",
        role: "child",
    })}).toThrow("Name must not empty.");
});
