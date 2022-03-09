import { Router } from 'express';
import { postController } from '../controller/postController';

const router = Router();

router.post('/', postController.createPost);

export const postRouter = router;
