import { Family } from "../model/family";
import { User } from "../model/user";
import familyDb from "../repository/family.db";
import userDb from "../repository/user.db";
import { FamilyInput, Role } from "../types";
import userService from "./user.service";


const getAllFamilies = async (email: string, role: Role): Promise<Family[]> => {
    if (role == 'admin') {
        return familyDb.getAllFamilies();
    } else if (role == 'parent') {
        return familyDb.getFamilyWithOwner(email);
    } else {
        return familyDb.getFamilyWithChild(email);
    }

}

const getFamilyById = async(familyId: number): Promise<Family> => {
    const family = await familyDb.getFamilyById(familyId);
    if (!family) {
        throw Error("No family with this id exists");
    }
    return family;
}

const createFamily = async (familyName: string, userEmail: string): Promise<Family> => {
    const user = await userDb.getUserByEmail(userEmail);
    if (!user) {
        throw new Error('User does not exist.');
    }
    const familyList: User[] = [user];

    return familyDb.createFamily(familyName, familyList, user);
}

const addFamilyMember = async (familyId: number, userEmail: string) => {
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

const deleteFamily = async (familyId: number): Promise<void> => {
    const family = await familyDb.getFamilyById(familyId);
    if (!family) {
        throw new Error('Family does not exist.');
    }
    return familyDb.deleteFamily(familyId);
}

const removeFamilyMember = async (familyId: number, userEmail: string): Promise<void> => {
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