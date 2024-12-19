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

type ItemInput = {
    id?: number;
    name: string;
    quantity: number;
}

type ShoppingListInput = {
    id?: number;
    name: string;
    creationDate: Date;
    lastUpdate: Date;
    updatedBy: User;
    items: ItemInput[];
}

type AuthenticationResponse = {
    token: string,
    name: string,
    email: string,
    role: Role
}

export {
    Role,
    UserInput,
    FamilyInput,
    ItemInput,
    ShoppingListInput,
    AuthenticationResponse,
}

