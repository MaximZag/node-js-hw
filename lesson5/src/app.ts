import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req: Request, res: Response) => {
    const user = await getManager().getRepository(User).find();
    console.log(user);
    res.json(user);
});

app.post('/users', async (req, res) => {
    console.log(req.body);
    // const createdUser = await getManager().getRepository(User).save(req.body);
    // console.log(createdUser);
    // res.json(createdUser);
});

app.get('/users/:id', async (req: Request, res: Response) => {
    const user = await getManager().getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :id', { id: +req.params['id'] })
        .leftJoin('Posts', 'posts', 'posts.userId = user.id')
        .getOne();
    res.json(user);
});

app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(createdUser);
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
