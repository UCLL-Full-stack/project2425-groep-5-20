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
familyRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const families = await familyService.getAllFamilies();
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
 * /families:
 *   post:
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

export default familyRouter;