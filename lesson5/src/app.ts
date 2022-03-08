import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';
import { Post } from './entity/post';
import { Comment } from './entity/comment';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req: Request, res: Response) => {
    const user = await getManager().getRepository(User).find({ relations: ['posts'] });
    res.json(user);
});

app.post('/users', async (req, res) => {
    const createdUser = await getManager().getRepository(User).save(req.body);
    console.log(createdUser);
    res.json(createdUser);
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

app.delete('/users/:id', async (req, res) => {
    const createdUser = await getManager()
        .getRepository(User)
        .softDelete({ id: Number(req.params.id) });
    res.json(createdUser);
});

app.post('/posts', async (req: Request, res: Response) => {
    try {
        const post = await getManager().getRepository(Post).save(req.body);
        res.status(201).json(post);
    } catch (e) {
        console.log(e);
    }
});

app.get('/posts/:userId', async (req: Request, res: Response) => {
    try {
        const user = await getManager().getRepository(Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id: +req.params['userId'] })
            .leftJoin('User', 'user', 'user.id = post.userId')
            .getMany();
        res.json(user);
    } catch (e) {
        console.log(e);
    }
});

app.put('/posts/:postId', async (req: Request, res: Response) => {
    try {
        const { title, text } = req.body;
        const updatedPost = await getManager()
            .getRepository(Post)
            .update({ id: Number(req.params['postId']) }, { title, text });
        res.json(updatedPost);
    } catch (e) {
        console.log(e);
    }
});

app.post('/comments', async (req, res) => {
    try {
        const createdComment = await getManager().getRepository(Comment).save(req.body);
        res.status(201).json(createdComment);
    } catch (e) {
        console.log(e);
    }
});

app.get('/comments/:userId', async (req: Request, res: Response) => {
    try {
        const comments = await getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: +req.params['userId'] })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
        res.json(comments);
    } catch (e) {
        console.log(e);
    }
});

app.post('/comments/action', async (req: Request, res: Response) => {
    try {
        const { action, commentId } = req.body;
        const queryRunner = getManager().getRepository(Comment);
        const comment = await queryRunner.createQueryBuilder('comment')
            .where('comment.id = :id', { id: commentId })
            .getOne();

        if (!comment) {
            throw new Error('wrong comment ID');
        }

        if (action === 'like') {
            await queryRunner.update({ id: commentId }, { like: comment.like + 1 });
        }
        if (action === 'dislike') {
            await queryRunner.update({ id: commentId }, { dislike: comment.dislike + 1 });
        }

        res.sendStatus(201);
    } catch (e) {
        console.log(e);
    }
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
