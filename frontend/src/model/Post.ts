
export interface PostInterface {
    author: {
        username: string,
        name: string,
        profilePic: string
    },
    authorId: number
    content: string,
    likeCount: number,
    commentCount: number,
    id: number,
    updatedAt: string,
    publishedAt: string,
    liked: boolean,
}


