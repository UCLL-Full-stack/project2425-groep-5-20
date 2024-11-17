import { User } from "./user";


export class Family {
    private name: string;
    private familyList: User[];
    private owner: User;


    constructor(family: {name: string, familyList: User[], owner: User}) {
        this.validate(family);
        this.name = family.name;
        this.familyList = family.familyList;
        this.owner = family.owner;
    }

    validate(family: {name: string, familyList: User[], owner: User}) {
        // name validation
        if (!family.name || family.name.trim().length < 1){
            throw new Error("Name must not be empty")
        }
        // familylist validation
        if (family.familyList.length < 1 && family.familyList.some(user => user !== family.owner)) {
            throw new Error("Owner must be part of the family")
        }
    }

    getName(): string {
        return this.name;
    }

    getFamilyList(): User[] {
        return this.familyList;
    }

    getOwner(): User {
        return this.owner;
    }
}

