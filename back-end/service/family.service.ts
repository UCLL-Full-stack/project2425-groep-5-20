import { Family } from "../model/family";
import { User } from "../model/user";
import familyDb from "../repository/family.db";
import userDb from "../repository/user.db";
import { FamilyInput } from "../types";
import userService from "./user.service";


const getAllFamilies = async (): Promise<Family[]> => familyDb.getAllFamilies();

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