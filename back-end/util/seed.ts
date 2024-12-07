import { PrismaClient } from "@prisma/client";

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
            password: 'jorrit1234',
            role: 'admin',
        }
    })

    const userJohn = await prisma.user.create({
        data: {
            name: 'John',
            email: 'john@email.com',
            password: 'john12345678',
            role: 'parent',
        }
    })

    const userJohnJr = await prisma.user.create({
        data: {
            name: 'JohnJr',
            email: 'johnJr@email.com',
            password: 'johnJr12345678',
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