import { IComment } from '../entity/comment';

export interface ICommentRepository {
    createComment(comment:IComment):Promise<IComment>;
    getCommentsByUser(id:string):Promise<IComment[]>;
}
