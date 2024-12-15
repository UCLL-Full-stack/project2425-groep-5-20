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

const createFamily = async (familyName: string, userEmail: string): Promise<Family> => {
    const user = await userDb.getUserByEmail(userEmail);
    if (!user) {
        throw new Error('User does not exist.');
    }
    const familyList: User[] = [user];

    return familyDb.createFamily(familyName, familyList, user);
}

export default {
    getAllFamilies,
    createFamily,
}