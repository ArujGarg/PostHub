import { usePosts } from "../src/hooks";
import { PostCard } from "./PostCard";


export function Following(){
    const {loading, posts} = usePosts();

    if(loading){
        return <div>Loading...</div>    
    }
    return (
        <div className="bg-neutral-900 w-full h-full border-x border-neutral-800">
            {posts.slice(0).reverse().map(post => <PostCard
                id={post.id}
                profilePic={post.author.profilePic}
                username={post.author.username}
                name={post.author.name}
                content={post.content}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                publishedAt={post.publishedAt}
                updatedAt={post.updatedAt}
            />)}
        </div>
    )
}