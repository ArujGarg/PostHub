
import { ProfileSection } from "../../components/ProfileSection";
import { SearchUser } from "../../components/SearchUser";
import { Sidebar } from "../../components/Sidebar";
import { useUserPosts } from "../hooks";
import { useParams } from "react-router-dom";
import { Skeleton } from "../../components/Following";
import { PostCard } from "../../components/PostCard";

export function ProfilePage(){
    const {username} = useParams();
    const {loading, userPosts} = useUserPosts(username ?? "");
    console.log("loading",loading)
    console.log("userposts",userPosts)
    
    if(loading || !userPosts){

        return (
            <div className="bg-neutral-900 flex justify-center w-full h-screen text-white grid grid-cols-12">
            <div className="col-span-3">
                <Sidebar />
                <ProfileSection />
            </div>
            <div className="h-screen col-span-6  flex flex-col">
                <div className="h-16 border border-neutral-800 flex items-center justify-center font-bold text-xl p-5">
                    {username} Posts
                </div>
                <div className="w-full">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            </div>
            <div className="h-screen col-span-3 w-full flex justify-center  border border-neutral-800">
                <SearchUser />
            </div>
        </div>
        )
    }

    return (
    <div className="bg-neutral-900 flex justify-center w-full h-screen text-white grid grid-cols-12">
        <div className="col-span-3">
            <Sidebar />
            <ProfileSection />
        </div>
        <div className="h-screen col-span-6  flex flex-col">
            <div className="h-16 border border-neutral-800 flex items-center justify-center font-bold text-xl">
                {username} Profile
            </div>
            <div className="flex-1 overflow-y-auto ">
                {userPosts.map(post => <PostCard key={post.id} postId={post.id} />)}
            </div>
        </div>
        <div className="h-screen col-span-3 w-full flex justify-center  border border-neutral-800">
            <SearchUser />
        </div>
    </div>
    )
}