import { EntityRepository, getManager, Repository } from 'typeorm';
import { Comment, IComment } from '../entity/comment';
import { ICommentRepository } from './commentRepository.interface';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> implements ICommentRepository {
    public async createComment(comment:IComment):Promise<IComment> {
        return getManager().getRepository(Comment).save(comment);
    }

    public async getCommentsByUser(id:string):Promise<IComment[]> {
        return getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
    }

    public async actionComment(id:string, action:string):Promise<IComment | undefined> {
        const comment=getManager().getRepository(Comment).createQueryBuilder('comment')
            .where('comment.id = :id', { id })
            .getOne();
console.log(comment);
        if (!comment) {
            throw new Error('wrong comment ID');
        }

        if (action === 'like') {
            await getManager().getRepository(Comment).update({ id: Number(id) }, { like: comment.like + 1 });
        }
        if (action === 'dislike') {
            await getManager().getRepository(Comment).update({ id: Number(id) }, { dislike: comment.dislike + 1 });
        }
        return comment;
    }
}

export const commentRepository = new CommentRepository();
