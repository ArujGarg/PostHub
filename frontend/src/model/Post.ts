
export interface PostInterface {
    author: {
        authorId: number
        username: string,
        name: string,
        profilePic: string
    },
    content: string,
    likeCount: number,
    commentCount: number,
    id: number,
    updatedAt: string,
    publishedAt: string,
    liked: boolean,
}


