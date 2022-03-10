import { Router } from 'express';
import { postController } from '../controller/postController';

const router = Router();

router.post('/', postController.createPost);
router.get('/:userId', postController.getUserPosts);
router.put('/:postId', postController.updatePost);

export const postRouter = router;
