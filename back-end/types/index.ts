import { User } from "../model/user";

type Role = 'admin' | 'parent' | 'child';

type UserInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}

type FamilyInput = {
    id?: number,
    name: string;
    familyList: User[];
    owner: User;
}

export {
    Role,
    UserInput,
    FamilyInput,
}
