import bcrypt from 'bcrypt';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IUser } from '../entity/user';
import { userRepository } from '../repositories/userRepository';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        const createdUser = await userRepository.createUser(dataToSave);
        return createdUser;
    }

    public async getUser():Promise<IUser[]> {
        return userRepository.getUser();
    }

    public async getUserById(id:string):Promise<IUser | undefined> {
        return userRepository.getUserById(id);
    }

    public async patchUser(id:string, email:string, password:string):Promise<UpdateResult> {
        return userRepository.patchUser(id, password, email);
    }

    public async deleteUser(id:string):Promise<DeleteResult> {
        return userRepository.deleteUser(id);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async compareUserPasswords(password: string, hash: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('User not exists');
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
