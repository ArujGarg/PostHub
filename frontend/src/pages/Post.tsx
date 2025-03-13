import { useParams } from "react-router-dom";
import { PostCard } from "../../components/PostCard";
import { ProfileSection } from "../../components/ProfileSection";
import { Sidebar } from "../../components/Sidebar";
import { usePost } from "../hooks";

export function Post(){
    const {id} = useParams();
    const {loading, post} = usePost(Number(id))
    if(loading){
        return <div>Loading...</div>
    }
    return <div>
         <div className="bg-neutral-900 flex justify-center w-full h-screen text-white grid grid-cols-12">
            <div className="col-span-3">
                <Sidebar />
                <ProfileSection />
            </div>
            <div className="h-screen col-span-6  flex flex-col border-x border-neutral-800">
                <div className=" border-x border-neutral-800">
                    <PostCard 
                    id={Number(id)}
                    profilePic={post?.author.profilePic || ""}
                    name={post?.author.name || "Anonymous"}
                    username={post?.author.username || "Anonymous"}
                    likeCount={post?.likeCount || 0}
                    commentCount={post?.commentCount || 0}
                    content={post?.content || ""}
                    publishedAt={post?.publishedAt || ""}
                    updatedAt={post?.updatedAt || ""}
                    
                    />
                </div>
                <div className="flex items-center justify-center text-3xl mt-20">
                    Comment section coming soon!!!
                </div>
            </div>
        </div>
    </div>
}