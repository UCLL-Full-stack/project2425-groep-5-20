import {User} from "../model/user"
import { Role } from "../types"
import database from "../util/database";


// // empty userlist
// const users: User[] = []

// // making new users to fill the list
// users.push(new User({name: "Jorrit", email: "jorrit@email.com", password: "UnhackableHackmaster123", role: 'admin'}));
// users.push(new User({name: "John", email: "john@email.com", password: "VerySecure123", role: 'parent'}));
// users.push(new User({name: "Johnjr", email: "johnjr@email.com", password: "VerySecure123", role: 'child'}));

// //----functions----//

// GET
const getAllUsers = async(): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany();
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error: Could not fetch all users, check server logs.')
    }
}

const getUserByEmail = async(email:string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {email}
        });
        
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error: Could not fetch user with email, check server logs.')

    }
}

// Post
const createUser = async(user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                name: user.getName().toString(),
                email: user.getEmail().toString(),
                password: user.getPassword().toString(),
                role: user.getRole()
            }
        });

        return User.from(userPrisma);

    } catch (error) {
        console.error(error);
        throw new Error('Database error: Could not create user, check server logs.')
    }
}

// export functions
export default {
    getAllUsers,
    getUserByEmail,
    createUser
}