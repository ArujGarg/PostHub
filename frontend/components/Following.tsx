import { usePosts } from "../src/hooks";
import { PostCard } from "./PostCard";


export function Following(){
    const {loading, posts} = usePosts();

    if(loading){
        return <div className="w-full">
           <Skeleton />
           <Skeleton />
           <Skeleton />
           <Skeleton />
           <Skeleton />
        </div>    
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

function Skeleton(){
    return (
        <div>
            <div className="w-[97.7%] rounded-md border border-neutral-800 p-4 m-2 ">
                <div className="flex animate-pulse space-x-4 pr-6">
                    <div className="size-12 rounded-full bg-gray-200"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-2 rounded bg-gray-200 w-[80px]"></div>
                        <div className="h-2 rounded bg-gray-200 w-[80px]"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                            </div>
                            <div className="h-2 rounded bg-gray-200"></div>
                        </div>
                        <div className="h-2 rounded bg-gray-200 w-[80px]"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}