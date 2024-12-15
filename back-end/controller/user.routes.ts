/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth: 
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
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
 *           description: User name.
 *         email:
 *           type: string
 *           description: User email.
 *         password:
 *           type: string
 *           description: User Password
 *         role:
 *           $ref: '#/components/schemas/Role'
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router();

// --------------- GET --------------- //

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *         - bearerAuth: []
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: An array of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
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
 * /users/{email}:
 *   get:
 *     security:
 *         - bearerAuth: []
 *     summary: Get a a user by email.
 *     parameters:
 *         - in: path
 *           name: email
 *           schema:
 *             type: string
 *             required: true
 *             description: user email
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 */

userRouter.get("/:email", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        res.status(200).json(user);
    } catch(error) {
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        }
    }
});

// --------------- POST --------------- //

/**
 * @swagger
 * /users/signup:
 *   post:
 *      security:
 *          - bearerAuth: []
 *      summary: Create a new user object
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *         200:
 *            description: The created user.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        }
    }
});

// --------------- POST --------------- //

/**
 * @swagger
 * /users/login:
 *   post:
 *      security:
 *          - bearerAuth: []
 *      summary: Logs user in
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *         200:
 *            description: The logged in user
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */

userRouter.post("/login", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const response = await userService.authenticate(user);
        res.status(200).json({message: "Authentication successful...", ...response});
    } catch (error) {
        next(error)
    }
})

export default userRouter;