import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IUser } from '../entity/user';
import { userService } from '../services/userService';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUser(req: Request, res: Response): Promise<Response<IUser[]>> {
        const user = await userService.getUser();
        return res.json(user);
    }

    public async getUserById(req: Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        return res.json(user);
    }

    public async patchUser(req: Request, res: Response):Promise<Response<UpdateResult>> {
        const { password, email } = req.body;
        const { id } = req.params;
        const updatedUser = await userService.patchUser(id, password, email);
        return res.json(updatedUser);
    }

    public async deleteUser(req: Request, res: Response):Promise<Response<DeleteResult>> {
        const { id } = req.params;
        const deletedUser = await userService.deleteUser(id);
        return res.json(deletedUser);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }
}

export const userController = new UserController();
