import { Following } from "../../components/Following";
import { ProfileSection } from "../../components/ProfileSection";
import { Sidebar } from "../../components/Sidebar";

export function Home(){
    return (
        <div className="bg-neutral-900 flex justify-center w-full h-screen text-white grid grid-cols-12">
            <div className="col-span-3">
                <Sidebar />
                <ProfileSection />
            </div>
            <div className="h-screen col-span-6  flex flex-col">
                <div className="h-16 border border-neutral-900 flex items-center justify-center font-bold text-xl">
                    Following
                </div>
                <div className="flex-1 overflow-y-auto ">
                    <Following  />
                </div>
            </div>
        </div>
    )
}