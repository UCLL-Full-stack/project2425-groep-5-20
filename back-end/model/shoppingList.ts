import { Item } from "./item";
import { User } from "./user";
import {Item as ItemPrisma} from '@prisma/client';
import {User as UserPrisma} from '@prisma/client';
import { ShoppingList as ShoppingListPrisma } from "@prisma/client";

export class ShoppingList {
    private id?: number;
    private items: Item[];
    private name: string;
    private creationDate: Date;
    private lastUpdate: Date;
    private updatedBy: User;

    constructor(shoppingList: {id?: number,name: string, creationDate: Date, lastUpdate: Date, updatedBy: User, items: Item[]}) {
        this.validate(shoppingList);

        this.id = shoppingList.id;
        this.name = shoppingList.name;
        this.creationDate = shoppingList.creationDate;
        this.lastUpdate = shoppingList.lastUpdate;
        this.updatedBy = shoppingList.updatedBy;
        this.items = shoppingList.items;
    }

    validate(shoppingList: {id?: number, name: string, creationDate: Date, lastUpdate: Date, updatedBy: User, items: Item[]}) {
        if (!shoppingList.name || shoppingList.name.trim().length < 1) {
            throw new Error("Item name must not empty.");
        }

        if (shoppingList.creationDate.getTime() > Date.now()) {
            throw new Error("The creation date can't be before today's date.");
        }

        if (shoppingList.lastUpdate.getTime() > Date.now()) {
            throw new Error("The last update can't be in the future.");
        }

        if (shoppingList.lastUpdate.getTime() < shoppingList.creationDate.getTime()) {
            throw new Error("The last update can't occur before the creation date.");
        }
    }

    static from({id, name, creationDate, lastUpdate, updatedBy, items}: ShoppingListPrisma & {updatedBy: UserPrisma, items: ItemPrisma[]}) {
        return new ShoppingList({
            id,
            name,
            creationDate,
            lastUpdate,
            updatedBy: User.from(updatedBy),
            items: items.map((item) => Item.from(item))
        })
    }

    addItem(item: Item) {
        this.items.push(item);
    }

    getId(): number | undefined {
        return this.id;
    }

    getItems(): Item[] {
        return this.items;
    }

    getName(): string {
        return this.name;
    }

    getCreationDate(): Date {
        return this.creationDate;
    }

    getLastUpdate(): Date {
        return this.lastUpdate;
    }

    setLastUpdateToNow() {
        this.lastUpdate = new Date();
    }

    getUpdatedBy(): User {
        return this.updatedBy;
    }

    setUpdatedBy(user: User) {
        this.updatedBy = user;
    }
}