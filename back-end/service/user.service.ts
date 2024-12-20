import { User } from "../model/user";
import { AuthenticationResponse, UserInput } from "../types";
import userDb from "../repository/user.db";
import bcrypt from "bcrypt";
import generateJwtToken from "../util/jwt";


const getAllUsers = async (role: string): Promise<User[]> => {
    if (role == 'child') {
        throw new Error('You are not authorised to do that.')
    }
    return await userDb.getAllUsers();
}

const getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await userDb.getUserByEmail(email);

    if (!user) {
        throw new Error("User does not exist");
    }

    return user;
}

const createUser = async ({name, email, password, role}: UserInput): Promise<AuthenticationResponse> => {
    if (await userDb.getUserByEmail(email)) {
        throw new Error("User with this email already exists.");
    }
    
    const user = new User({name, email, password: await bcrypt.hash(password, 12), role});
    await userDb.createUser(user);
    return {
        
        token: generateJwtToken(email, user.getRole()),
        name: user.getName(),
        email: user.getEmail(),
        role: user.getRole(),
    }
}

const authenticate = async({email, password}: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByEmail(email);
    if (user === null) {
        throw Error("Incorrect email or password.");
    }

    const isValidPassword = await bcrypt.compare(password, user.getPassword()); 

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