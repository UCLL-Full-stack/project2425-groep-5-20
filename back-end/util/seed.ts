import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async() => {
    await prisma.shoppingList.deleteMany();
    await prisma.item.deleteMany();
    await prisma.family.deleteMany();
    await prisma.user.deleteMany();

    const admin = await prisma.user.create({
        data: {
            name: 'Admin',
            email: 'admin@email.com',
            password: await bcrypt.hash('admin123', 12),
            role: 'admin',
        }
    })

    const parent = await prisma.user.create({
        data: {
            name: 'Parent',
            email: 'parent@email.com',
            password: await bcrypt.hash('parent123', 12),
            role: 'parent',
        }
    })

    const child = await prisma.user.create({
        data: {
            name: 'Child',
            email: 'child@email.com',
            password: await bcrypt.hash('child123', 12),
            role: 'child',
        }
    })


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

    const userJane = await prisma.user.create({
        data: {
            name: 'Jane',
            email: 'jane@email.com',
            password: await bcrypt.hash('jane12345678', 12),
            role: 'parent',
        }
    })

    const userJohnJr = await prisma.user.create({
        data: {
            name: 'JohnJr',
            email: 'johnjr@email.com',
            password: await bcrypt.hash('johnJr12345678', 12),
            role: 'child',
        }
    })

    const userJeniffer = await prisma.user.create({
        data: {
            name: 'Jeniffer',
            email: 'jeniffer@email.com',
            password: await bcrypt.hash('jeniffer12345678', 12),
            role: 'child',
        }
    })

    const FamilyTest = await prisma.family.create({
        data: {
            name: 'Familie test',
            familyList: {
                connect: [{id: userJorrit.id}]
            },
            owner: {
                connect: {id: userJorrit.id}
            }
        }
    })

    const FamilyDoe = await prisma.family.create({
        data: {
            name: 'De Doe Familie',
            familyList: {
                connect: [{id: userJohn.id}, {id: userJohnJr.id}, {id: userJane.id}, {id: userJeniffer.id}]
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