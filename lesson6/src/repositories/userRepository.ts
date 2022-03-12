import {
    DeleteResult,
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IUser, User } from '../entity/user';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getUser(): Promise<IUser[]> {
        return getManager().getRepository(User).find();
    }

    public async getUserById(id:string):Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .leftJoin('Posts', 'posts', 'posts.userId = user.id')
            .getOne();
    }

    public async patchUser(id:string, email:string, password:string):Promise<UpdateResult> {
        return getManager().getRepository(User)
            .update({ id: Number(id) }, {
                password,
                email,
            });
    }

    public async deleteUser(id:string):Promise<DeleteResult> {
        return getManager()
            .getRepository(User)
            .delete({ id: Number(id) });
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }
}

export const userRepository = new UserRepository();
