import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async() => {
    await prisma.item.deleteMany();
    await prisma.shoppingList.deleteMany();
    await prisma.family.deleteMany();
    await prisma.user.deleteMany();

    const userJorrit = await prisma.user.create({
        data: {
            name: 'Jorrit',
            email: 'jorrit@email.com',
            password: await bcrypt.hash('jorrit1234', 12),
            role: 'admin',
        }
    })

    const userJohn = await prisma.user.create({
        data: {
            name: 'John',
            email: 'john@email.com',
            password: await bcrypt.hash('john12345678', 12),
            role: 'parent',
        }
    })

    const userJohnJr = await prisma.user.create({
        data: {
            name: 'JohnJr',
            email: 'johnJr@email.com',
            password: await bcrypt.hash('johnJr12345678', 12),
            role: 'child',
        }
    })

    const FamilyBoze = await prisma.family.create({
        data: {
            name: 'De Boze Familie',
            familyList: {
                connect: [{id: userJorrit.id}]
            },
            owner: {
                connect: {id: userJorrit.id}
            }
        }
    })

    const FamilyJohn = await prisma.family.create({
        data: {
            name: 'De John Familie',
            familyList: {
                connect: [{id: userJohn.id}, {id: userJohnJr.id}]
            },
            owner: {
                connect: {id: userJohn.id}
            }
        }
    })





}

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