import { User } from "../model/user";
import { AuthenticationResponse, UserInput } from "../types";
import userDb from "../repository/user.db";
import bcrypt from "bcrypt";
import generateJwtToken from "../util/jwt";


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

const authenticate = async({email, password}: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByEmail(email);
    if (user === null) {
        throw Error("Incorrect email or password.");
    }

    const isValidPassword = await bcrypt.compare(user.getPassword(), password); 

    if (!isValidPassword) {
        throw Error("Incorrect email or password.");
    }

    return {
        token: generateJwtToken(email, user.getRole()),
        name: user.getName(),
        email: user.getEmail(),
        role: user.getRole(),
    }
}


export default {
    getAllUsers,
    getUserByEmail,
    createUser,
    authenticate,
}