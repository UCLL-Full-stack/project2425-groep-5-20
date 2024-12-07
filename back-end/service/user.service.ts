import { User } from "../model/user"
import { UserInput } from "../types";
import userDb from "../repository/user.db"


const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserByEmail = async (email: string): Promise<User | null> => {
    const user = userDb.getUserByEmail(email);

    return user;
}

const createUser = async ({name, email, password, role}: UserInput): Promise<User> => {
    if (!name) throw new Error("createUser: Name is required.");
    if (!email) throw new Error("createUser: Email is required.");
    if (!password) throw new Error("createUser: Password is required.");
    if (!role) throw new Error("createUser: Role is required");
    
    const user = new User({name, email, password, role});
    userDb.createUser(user);

    return user;
}


export default {
    getAllUsers,
    getUserByEmail,
    createUser,
}