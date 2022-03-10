import { Router } from 'express';
import { commentController } from '../controller/commentController';

const router = Router();

router.post('/', commentController.createComment);
router.get('/:userId', commentController.getCommentsByUser);
router.post('/action', commentController.actionComment);

export const commentRouter = router;
