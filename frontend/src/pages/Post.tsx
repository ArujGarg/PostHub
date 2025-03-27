import { useParams } from "react-router-dom";
import { PostCard } from "../../components/PostCard";
import { ProfileSection } from "../../components/ProfileSection";
import { Sidebar } from "../../components/Sidebar";
import { usePost } from "../hooks";

export function Post(){
    const {id} = useParams();
    const {loading, post} = usePost(Number(id))
    if(loading){
        return (
            <div>
                <div className="bg-neutral-900 flex justify-center w-full h-screen text-white grid grid-cols-12">
                    <div className="col-span-3">
                        <Sidebar />
                        <ProfileSection />
                    </div>
                    <div className="h-screen col-span-6  flex justify-center flex-col border-x border-neutral-800">
                        <div className=" border-x border-neutral-800 flex justify-center items-center">
                            <span className=" h-20 w-20 loading loading-infinity loading-xl"></span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center text-3xl mt-20">
                        Comment section coming soon!!!
                    </div>
                </div>
            </div>
        )
    }
    
    if(!post){
        return <p>Post not found</p>
    }

    return <div>
         <div className="bg-neutral-900 flex justify-center w-full h-screen text-white grid grid-cols-12">
            <div className="col-span-3">
                <Sidebar />
                <ProfileSection />
            </div>
            <div className="h-screen col-span-6  flex flex-col border-x border-neutral-800">
                <div className=" border-x border-neutral-800">
                    <PostCard postId={post?.id} />
                </div>
                <div className="flex items-center justify-center text-3xl mt-20">
                    Comment section coming soon!!!
                </div>
            </div>
        </div>
    </div>
}

