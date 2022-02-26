import {
    Column, Entity,
} from 'typeorm';

import { CommonFields } from './commonFields';
// import { Post } from './post';
// import { User } from './user';

export interface IComment {
    text: string;
    like: number;
    dislike: number;
    authorId: number;
    postId: number;
}

@Entity('comments', { database: 'new' })
export class Comment extends CommonFields implements IComment {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
    })
        like: number;

    @Column({
        type: 'int',
    })
        dislike: number;

    @Column({
        type: 'int',
    })
        authorId: number;

    @Column({
        type: 'int',
    })
        postId: number;

    // @ManyToOne(() => User, (user) => user.comments)
    // @JoinColumn({ name: 'authorId' })
    //     user: User;
    //
    // @ManyToOne(() => Post, (post) => post.comments)
    // @JoinColumn({ name: 'postId' })
    //     post: Post;
}
