import { User } from "./user";
import { User as UserPrisma} from '@prisma/client';
import { Family as FamilyPrisma} from '@prisma/client';


export class Family {
    private id?: number;
    private name: string;
    private familyList: User[];
    private owner: User;


    constructor(family: {id?: number, name: string, familyList: User[], owner: User}) {
        this.validate(family);

        this.id = family.id;
        this.name = family.name;
        this.familyList = family.familyList;
        this.owner = family.owner;
    }

    validate(family: {id?: number, name: string, familyList: User[], owner: User}) {
        // name validation
        if (!family.name || family.name.trim().length < 1){
            throw new Error("Name must not be empty")
        }
        // familylist validation
        if (family.familyList.length < 1 && family.familyList.some(user => user !== family.owner)) {
            throw new Error("Owner must be part of the family")
        }
    }

    static from({id, name, familyList, owner}: FamilyPrisma & {familyList: UserPrisma[], owner: UserPrisma}) {
        return new Family ({
            id,
            name,
            familyList: familyList.map((user) => User.from(user)),
            owner: User.from(owner)
        })
    }

    getId(): number | undefined {
        return this.id;
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

