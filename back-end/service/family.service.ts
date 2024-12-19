import { Family } from "../model/family";
import { Item } from "../model/item";
import { User } from "../model/user";
import familyDb from "../repository/family.db";
import itemDb from "../repository/item.db";
import shoppingListDb from "../repository/shoppingList.db";
import userDb from "../repository/user.db";
import { FamilyInput, Role } from "../types";
import userService from "./user.service";


const getAllFamilies = async (email: string, role: Role): Promise<Family[]> => {
    if (role == 'admin') {
        return await familyDb.getAllFamilies();
    } else if (role == 'parent') {
        return await familyDb.getFamilyWithOwner(email);
    } else {
        return await familyDb.getFamilyWithChild(email);
    }

}

const getFamilyById = async(familyId: number): Promise<Family> => {
    const family = await familyDb.getFamilyById(familyId);
    if (!family) {
        throw Error("No family with this id exists");
    }
    return family;
}

const createFamily = async (familyName: string, userEmail: string, role: string): Promise<Family> => {
    if (role == 'child') {
        throw new Error("You are not authorised to do that");
    }
    const user = await userDb.getUserByEmail(userEmail);
    if (!user) {
        throw new Error('User does not exist.');
    }
    const familyList: User[] = [user];
    const family = new Family({name: familyName, familyList: familyList, owner: user});
    return familyDb.createFamily(family.getName(),family.getFamilyList(), family.getOwner());
}

const addFamilyMember = async (familyId: number, userEmail: string, role: string) => {
    if (role == 'child') {
        throw new Error("You are not authorised to do that.")
    }
    if (!familyId) {
        throw new Error('Family ID is required.');
    }
    const family = await familyDb.getFamilyById(familyId);
    if (!family) {
        throw new Error('Family does not exist.');
    }
    const user = await userDb.getUserByEmail(userEmail);
    if (!user) {
        throw new Error('User does not exist.');
    }
    return familyDb.addFamilyMember(familyId, user);
}

const deleteFamily = async (familyId: number, role: string): Promise<void> => {
    if (role == 'child') {
        throw new Error("You are not authorised to do that.");
    }
    
    const family = await familyDb.getFamilyById(familyId);
    const shoppingLists = await shoppingListDb.getAllShoppingListsForFamily(familyId);

    if (!family) {
        throw new Error('Family does not exist.');
    }

    if (shoppingLists.length > 0) {
        for (const shoppingList of shoppingLists) {
            await itemDb.deleteItemsFromShoppingList(shoppingList.getId());
    }}

    await shoppingListDb.deleteShoppingListsForFamily(familyId);

    return await familyDb.deleteFamily(familyId);
}

const removeFamilyMember = async (familyId: number, userEmail: string, role: string): Promise<void> => {
    if (role == "child") {
        throw new Error("You are not authorised to do that.")
    }
    
    if (!familyId) {
        throw new Error('Family ID is required.');
    }
    const family = await familyDb.getFamilyById(familyId);
    if (!family) {
        throw new Error('Family does not exist.');
    }
    const user = await userDb.getUserByEmail(userEmail);
    if (!user) {
        throw new Error('User does not exist.');
    }
    if (family.getOwner().getEmail() === user.getEmail()) {
        throw new Error('Owner cannot be removed from family.');
    }
    return familyDb.removeFamilyMember(familyId, user);
};
export default {
    getAllFamilies,
    getFamilyById,
    createFamily,
    deleteFamily,
    addFamilyMember,
    removeFamilyMember,
}