import { useEffect } from "react";
import { Following } from "../../components/Following";
import { ProfileSection } from "../../components/ProfileSection";
import { SearchUser } from "../../components/SearchUser";
import { Sidebar } from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

export function Home(){
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("/signin")
        }
    }, [])

    return (
        <div className="bg-neutral-900 flex justify-center w-full h-screen text-white grid grid-cols-12">
            <div className="col-span-3">
                <Sidebar />
                <ProfileSection />
            </div>
            <div className="h-screen col-span-6  flex flex-col">
                <div className="h-16 border border-neutral-800 flex items-center justify-center font-bold text-xl">
                    Feed
                </div>
                <div className="flex-1 overflow-y-auto ">
                    <Following  />
                </div>
            </div>
            <div className="h-screen col-span-3 w-full flex justify-center  border border-neutral-800">
                <SearchUser />
            </div>
        </div>
    )
}