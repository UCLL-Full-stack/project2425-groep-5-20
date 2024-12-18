// Swagger documentation for the family routes
// http://localhost:3000/api-docs/
/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: string
 *       enum: [admin, parent, child]
 *       description: The role of the user.
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           description: The email of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         role:
 *           $ref: '#/components/schemas/Role'
 *           description: The role of the user.
 *     Family:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the family.
 *         familyList:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: The list of family members.
 *         owner:
 *           $ref: '#/components/schemas/User'
 *           description: The owner of the family.
 */
import express, { NextFunction, Request, Response } from 'express';
import familyService from '../service/family.service';
import { FamilyInput } from '../types';

const familyRouter = express.Router();

/**
 * @swagger
 * /families:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all families.
 *     responses:
 *       200:
 *         description: An array of all families.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Family'
 */
familyRouter.get('/', async(req: Request & {auth?: any}, res: Response, next: NextFunction) => {
    try {
        const {email, role} = req.auth;
        const families = await familyService.getAllFamilies(email, role);
        res.status(200).json(families);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        }
    }
});

/**
 * @swagger
 * /families/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all families.
 *     parameters:
 *         - in: path
 *           name: familyId
 *           schema:
 *             type: number
 *             required: true
 *             description: the family ID 
 *     responses:
 *       200:
 *         description: The family by ID.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Family'
 */
familyRouter.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const family = await familyService.getFamilyById(parseInt(req.params.id));
        res.status(200).json(family); 
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        }
    }
})

/**
 * @swagger
 * /families:
 *   post:
 *     security:
 *         - bearerAuth: []
 *     summary: Create a new family.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Family'
 *     responses:
 *       200:
 *         description: The created family.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Family'
 */
familyRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {familyName, userEmail} = req.body;
        const result = await familyService.createFamily(familyName, userEmail);
        res.status(200).json(result);
    } catch (error){
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        }
    }
});

/**
 * @swagger
 * /families/{id}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add a family member.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           required: true
 *           description: The family ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user to add.
 *     responses:
 *       200:
 *         description: The added family member.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
familyRouter.post("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const familyId = parseInt(req.params.id);
        const {email} = req.body;
        const result = await familyService.addFamilyMember(familyId, email);
        res.status(200).json(result);
    } catch (error){
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        }
    }
});

/**
 * @swagger
 * /families/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a family by ID.
 *     parameters:
 *       - in: path
 *         name: familyId
 *         schema:
 *           type: number
 *           required: true
 *           description: The family ID
 *     responses:
 *       200:
 *         description: The deleted family.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Family'
 */
familyRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const familyId = parseInt(req.params.id);
        const result = await familyService.deleteFamily(familyId);
        res.status(200).json(result);
    } catch (error){
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        }
    }
});

/**
 * @swagger
 * /families/{id}/{email}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove a family member.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           required: true
 *           description: The family ID
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *           required: true
 *           description: The email of the user to remove.
 *     responses:
 *       200:
 *         description: The removed family member.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
familyRouter.put("/:id/:email", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const familyId = parseInt(req.params.id);
        const email = req.body.email;
        const result = await familyService.removeFamilyMember(familyId, email);
        res.status(200).json(result);
    } catch (error){
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        }
    }
});
export default familyRouter;