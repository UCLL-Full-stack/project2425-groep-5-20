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
 *     Item:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the item.
 *         quantity:
 *           type: number
 *           description: The quantity of that certain item in the shopping list.
 *     ShoppingList:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the shopping list.
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *           description: The list of all items in the shopping list.
 *         creationDate:
 *           type: string
 *           format: date-time
 *           description: The creation date of the shopping list.
 *         lastUpdate:
 *           type: string
 *           format: date-time
 *           description: The last update of the shopping list.
 *         updatedBy:
 *           $ref: '#/components/schemas/User'
 *           description: The person who updated the shopping list last.
 */
import express, { NextFunction, Request, Response } from 'express';
import shoppingListsService from '../service/shoppingLists.service';

const shoppingListRouter = express.Router();



/**
 * @swagger
 * /shoppingLists:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all shopping lists.
 *     responses:
 *       200:
 *         description: An array of all shopping lists.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoppingList'
 */
shoppingListRouter.get('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingLists = await shoppingListsService.getAllShoppingLists();
        res.status(200).json(shoppingLists);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        }
    }
})

export default shoppingListRouter;