import { IPost } from '../entity/post';
import { postRepository } from '../repositories/postRepository';

class PostService {
    public async createPost(post:IPost):Promise<IPost> {
        const createdPost = await postRepository.createPost(post);
        return createdPost;
    }
}

export const postService = new PostService();
