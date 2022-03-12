import { getManager } from 'typeorm';
import { Comment, IComment } from '../entity/comment';
import { commentRepository } from '../repositories/commentRepository';

class CommentService {
    public async createComment(comment:IComment):Promise<IComment> {
        return commentRepository.createComment(comment);
    }

    public async getCommentsByUser(id:string):Promise<IComment[]> {
        return commentRepository.getCommentsByUser(id);
    }

    public async actionComment(id:string, action:string):Promise<IComment | undefined> {
        const comment = await commentRepository.actionComment(id, action);
        if (!comment) {
            throw new Error('wrong comment ID');
        }

        if (action === 'like') {
            await getManager().getRepository(Comment).update(
                { id: Number(id) },
                { like: comment.like + 1 },
            );
        }
        if (action === 'dislike') {
            await getManager().getRepository(Comment).update(
                { id: Number(id) },
                { dislike: comment.dislike + 1 },
            );
        }
        return comment;
    }
}

export const commentService = new CommentService();
