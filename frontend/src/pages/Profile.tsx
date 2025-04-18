import { ProfileSection } from "../../components/ProfileSection";
import { SearchUser } from "../../components/SearchUser";
import { Sidebar } from "../../components/Sidebar";

export function ProfilePage(){
    return (
    <div className="bg-neutral-900 flex justify-center w-full h-screen text-white grid grid-cols-12">
        <div className="col-span-3">
            <Sidebar />
            <ProfileSection />
        </div>
        <div className="h-screen col-span-6  flex flex-col">
            <div className="h-16 border border-neutral-800 flex items-center justify-center font-bold text-xl">
                Aruj's Profile
            </div>
            <div className="flex-1 overflow-y-auto ">
                user posts
            </div>
        </div>
        <div className="h-screen col-span-3 w-full flex justify-center  border border-neutral-800">
            <SearchUser />
        </div>
    </div>
    )
}