import { UpdateResult } from 'typeorm';
import { IPost } from '../entity/post';

export interface IPostRepository{
    createPost(post:IPost):Promise<IPost>;
    getUserPosts(id:string):Promise<IPost[]>;
    updatePost(id:string, title:string, text:string):Promise<UpdateResult>;
}
