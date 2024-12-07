import { Role } from "../types";
import {User as UserPrisma} from '@prisma/client'

export class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private role: Role;


    constructor(user: {id?: number, name: string, email: string, password: string, role: Role}) {
        this.validate(user);

        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    validate(user: {id?: number, name: string, email: string, password: string, role: Role}) {
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       
       if (!user.name || user.name.trim().length < 1) {
        throw new Error("Name must not empty.");
       }
       
       if (!emailRegex.test(user.email)) {
        throw new Error("Email is not valid format.");
       }

       if (user.password.length < 8) {
        throw new Error("Password must be at least 8 characters long.")
       }
    }

    static from({id, name, email, password, role}: UserPrisma) {
        return new User({
            id,
            name,
            email,
            password,
            role: role as Role,
        })
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }
}
