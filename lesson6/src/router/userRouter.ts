import { Router } from 'express';
import { userController } from '../controller/userController';

const router = Router();

// router.get('/:email', userController.getUserByEmail);
router.post('/', userController.createUser);
router.get('/', userController.getUser);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.patchUser);
router.delete('/:id', userController.deleteUser);

export const userRouter = router;
