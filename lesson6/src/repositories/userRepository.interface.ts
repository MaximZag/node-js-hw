import { DeleteResult, UpdateResult } from 'typeorm';
import { IUser } from '../entity/user';

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
    getUser():Promise<IUser[]>;
    getUserById(id:string):Promise<IUser | undefined>;
    patchUser(id:string, email:string, password:string):Promise<UpdateResult>;
    deleteUser(id:string):Promise<DeleteResult>;
    // getUserByEmail(email: string): Promise<IUser | undefined>;
}
