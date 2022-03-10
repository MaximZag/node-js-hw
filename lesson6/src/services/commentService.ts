import { IComment } from '../entity/comment';
import { commentRepository } from '../repositories/commentRepository';

class CommentService {
    public async createComment(comment:IComment):Promise<IComment> {
        return commentRepository.createComment(comment);
    }

    public async getCommentsByUser(id:string):Promise<IComment[]> {
        return commentRepository.getCommentsByUser(id);
    }

    public async actionComment(id:string, action:string):Promise<IComment | undefined> {
        return commentRepository.actionComment(id, action);
    }
}

export const commentService = new CommentService();
