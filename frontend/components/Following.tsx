import { Post } from "./Post";

export function Following(){
    return (
        <div className="bg-neutral-900 w-full h-full border border-neutral-800">
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}