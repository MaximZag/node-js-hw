import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';

const app = express();

app.get('/users', async (req: Request, res: Response) => {
    const user = await getManager().getRepository(User).find();
    console.log(user);
    res.json(user);
});

app.listen(5500, async () => {
    console.log('Server started!!!');

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
