import * as dotenv from 'dotenv';
dotenv.config();
// : run om de database te fillen: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.item.deleteMany();
    await prisma.shoppingList.deleteMany();
    await prisma.family.deleteMany();
    await prisma.user.deleteMany();

    const john = await prisma.user.create({
        data: {
            username: 'john',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@email.com',
            role: 'PARENT',
            password: 'VerySecure123'
        },
    });

    const jorrit = await prisma.user.create({
        data: {
            username: 'jorrit',
            firstName: 'Jorrit',
            lastName: 'Smith',
            email: 'jorrit@email.com',
            role: 'ADMIN',
            password: 'UnhackableHackmaster123'
        },
    });

    const johnJr = await prisma.user.create({
        data: {
            username: 'johnjr',
            firstName: 'John Jr.',
            lastName: 'Doe',
            email: 'johnjr@email.com',
            role: 'CHILD',
            password: 'VerySecure123'
        },
    });

    const family1 = await prisma.family.create({
        data: {
            name: 'De Boze familie',
            owner: { connect: { id: jorrit.id } },
            familyList: { connect: [{ id: jorrit.id }] },
        },
    });

    const family2 = await prisma.family.create({
        data: {
            name: 'De John Family',
            owner: { connect: { id: john.id } },
            familyList: { connect: [{ id: john.id }, { id: johnJr.id }] },
        },
    });

    const shoppingList1 = await prisma.shoppingList.create({
        data: {
            name: 'Weekly Groceries',
            creationDate: new Date(),
            lastUpdate: new Date(),
            updatedBy: { connect: { id: john.id } },
        },
    });

    const shoppingList2 = await prisma.shoppingList.create({
        data: {
            name: 'Party Supplies',
            creationDate: new Date(),
            lastUpdate: new Date(),
            updatedBy: { connect: { id: jorrit.id } },
        },
    });

    await prisma.item.createMany({
        data: [
            { name: 'Milk', quantity: 2, listId: shoppingList1.id },
            { name: 'Bread', quantity: 1, listId: shoppingList1.id },
            { name: 'Cake', quantity: 1, listId: shoppingList2.id },
            { name: 'Soda', quantity: 6, listId: shoppingList2.id },
        ],
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();