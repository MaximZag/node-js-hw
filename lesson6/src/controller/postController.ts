import { Request, Response } from 'express';
import { IPost } from '../entity/post';
import { postService } from '../services/postService';

class PostController {
    public async createPost(req: Request, res: Response): Promise<Response<IPost>> {
        const createdPost = await postService.createPost(req.body);
        return res.json(createdPost);
    }
}

export const postController = new PostController();
