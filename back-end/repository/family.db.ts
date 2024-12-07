import { Family } from "../model/family";
import { User } from "../model/user";
import { FamilyInput } from "../types";
import database from "../util/database";


//empty family array
const families: Family[] = [];

// // adding testing data
// const john: User = new User({name: "John", email: "john@email.com", password: "VerySecure123", role: 'parent'});
// const jorrit: User = new User({name: "Jorrit", email: "jorrit@email.com", password: "UnhackableHackmaster123", role: 'admin'});
// const johnJr: User = new User({name: "Johnjr", email: "johnjr@email.com", password: "VerySecure123", role: 'child'});
// families.push(new Family({name:"De Boze familie", familyList: [jorrit], owner: jorrit}));
// families.push(new Family({name:"De John Family", familyList: [john, johnJr], owner: john}));

// Get
const getAllFamilies = async(): Promise<Family[]> => {
    try {
        const familyPrisma = await database.family.findMany({
            include: {owner: true, familyList: true}
        });
        return familyPrisma.map((family) => Family.from(family));
    } catch (error) {
        console.error(error);
        throw new Error('Database error: Could not fetch all families, check server logs.');
    }
}

// Post
const createFamily = async(name: string, familyList: User[], owner: User): Promise<Family> => {
    try {
        const familyPrisma = await database.family.create({
            data: {
                name: name,
                owner: {
                    connect: {id: owner.getId()}
                },
                familyList: {
                    connect: familyList.map((user) => ({id: user.getId()})),
                }         
            },
            include: {owner: true, familyList: true}
        });

    return Family.from(familyPrisma);

    } catch (error) {
        console.error(error);
        throw new Error('Database error: Could not create a new family, check server logs');
    }
}

export default {
    getAllFamilies,
    createFamily,
}