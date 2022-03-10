import { Request, Response } from 'express';
import { IComment } from '../entity/comment';
import { commentService } from '../services/commentService';

class CommentController {
    public async createComment(req: Request, res: Response):Promise<Response<IComment>> {
        const createdComment = await commentService.createComment(req.body);
        return res.json(createdComment);
    }

    public async getCommentsByUser(req: Request, res: Response):Promise<Response<IComment[]>> {
        const { userId } = req.params;
        const comments = await commentService.getCommentsByUser(userId);
        return res.json(comments);
    }

    public async actionComment(req: Request, res: Response):Promise<Response<IComment>> {
        const { action, commentId } = req.body;
        const comment = await commentService.actionComment(commentId, action);
        return res.json(comment);
    }
}

export const commentController = new CommentController();
