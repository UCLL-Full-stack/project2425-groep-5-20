import { Family } from "../model/family";
import { User } from "../model/user";


//empty family array
const families: Family[] = [];

// adding testing data
const john: User = new User({name: "John", email: "john@email.com", password: "VerySecure123", role: 'parent'});
const jorrit: User = new User({name: "Jorrit", email: "jerrit@email.com", password: "UnhackableHackmaster123", role: 'admin'});
const johnJr: User = new User({name: "Johnjr", email: "johnjr@email.com", password: "VerySecure123", role: 'child'});
families.push(new Family({name:"De Boze familie", familyList: [jorrit], owner: jorrit}));
families.push(new Family({name:"De John Family", familyList: [john, johnJr], owner: john}));

// Get
const getAllFamilies = (): Family[] => {
    return families;
}

// Post
const createFamily = (family: Family) => {
    families.push(family);
}

export default {
    getAllFamilies,
    createFamily,
}