import {Item as ItemPrisma} from '@prisma/client';
export class Item {
    private id?: number;
    private name: string;
    private quantity: number;

    constructor(item: {id?: number, name: string, quantity: number}) {
        this.validate(item)

        this.id = item.id;
        this.name = item.name
        this.quantity = item.quantity
    }

    validate(item: {id?: number, name: string, quantity: number}) {
        // name validation
        if (item.name.length < 1 || item.name.trim().length < 1) {
            throw new Error("Name must not be empty")
        }
        // quantity validation
        if (item.quantity < 1) {
            throw new Error("Quantity cannot be 0")
        }
    }

    static from({id, name, quantity}: ItemPrisma) {
        return new Item({
            id,
            name,
            quantity
        })
    }
    
    addQuantity(number : number) {
        this.quantity += number
    }

    decreaseQuantity(number : number) {
        this.quantity -= number
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getQuantity(): number {
        return this.quantity;
    }
}