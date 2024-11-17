import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRouter from './controller/user.routes';
import familyRouter from './controller/family.routes';
import { Request, Response, NextFunction } from 'express';

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

// ENDPOINTS
app.use("/users", userRouter)
app.use("/families", familyRouter);

// Swagger 
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
            description: 'API documentation for the Courses API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./controller/*.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// generic error handeling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(400).json({
        status: 'application error',
        message: err.message,
    });
});