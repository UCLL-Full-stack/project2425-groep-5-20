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

/**
 * @swagger
 * /shoppingLists/family/{id}:
 *   get:
 *     security:
 *         - bearerAuth: []
 *     summary: Get the shopping lists of family.
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: number
 *             required: true
 *             description: the family id
 *     responses:
 *       200:
 *         description: An array of all shopping lists for a certain family.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoppingList'
 */

shoppingListRouter.get('/family/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingLists = await shoppingListsService.getAllShoppingListsForFamily(parseInt(req.params.id));
        res.status(200).json(shoppingLists);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        }
    }
})

// Post

/**
 * @swagger
 * /shoppingLists:
 *   post:
 *      security:
 *          - bearerAuth: []
 *      summary: Create a new shopping list object
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ShoppingList'
 *      responses:
 *         200:
 *            description: The created shoppingList.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/ShoppingList'
 */
shoppingListRouter.post('/', async(req: Request & {auth?: any}, res: Response, next: NextFunction) => {
    try {
        const {role} = req.auth;
        const shoppingList = await shoppingListsService.createShoppingList(req.body.name, req.body.userEmail, req.body.familyId, role);
        res.status(200).json(shoppingList);
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
 * /shoppingLists/{id}:
 *   post:
 *      security:
 *          - bearerAuth: []
 *      summary: Add an item to the shopping list object
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: number
 *             required: true
 *             description: the shopping list id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Item'
 *      responses:
 *         200:
 *            description: The created shoppingList.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/ShoppingList'
 */
shoppingListRouter.post('/:id', async(req: Request & {auth?: any}, res: Response, next: NextFunction) => {
    try {
        const {role} = req.auth;
        const shoppingList = await shoppingListsService.addItemToShoppingList(parseInt(req.params.id), req.body.item, req.body.userEmail, role);
        res.status(200).json(shoppingList);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        } 
    }
});

// Delete

/**
 * @swagger
 * /shoppingLists/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a shopping list by ID.
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: number
 *             required: true
 *             description: the shopping list id
 *     responses:
 *       200:
 *         description: The deleted item.
 */
shoppingListRouter.delete('/:id', async(req: Request & {auth?: any}, res: Response, next: NextFunction) => {
    try {
        const {role} = req.auth
        await shoppingListsService.deleteShoppingList(parseInt(req.params.id), role);
        res.status(200)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        } 
    }
});

export default shoppingListRouter;