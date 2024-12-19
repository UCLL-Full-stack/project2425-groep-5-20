import { User } from "../../model/user";
import { Family } from "../../model/family";

test(`given: valid family object values; when: family is created; then: Family is successfully created`, () => {
    const owner = new User({
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "parent",
    });

    const familyMember = new User({
        id: 2,
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: "password123",
        role: "child",
    });

    const family = new Family({
        id: 1,
        name: "Doe Family",
        familyList: [owner, familyMember],
        owner,
    });

    expect(family.getId()).toEqual(1);
    expect(family.getName()).toEqual("Doe Family");
    expect(family.getFamilyList()).toEqual([owner, familyMember]);
    expect(family.getOwner()).toEqual(owner);
});

test(`given: empty name field; when: family is created; then: name error is thrown`, () => {
    const owner = new User({
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "parent",
    });

    expect(() => {
        new Family({
            id: 1,
            name: "",
            familyList: [owner],
            owner,
        })}).toThrow("Name must not be empty");
});
