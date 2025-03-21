import { ProfileSection } from "../../components/ProfileSection"
import { Sidebar } from "../../components/Sidebar"


export function SearchComp() {
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
                    <div className="bg-neutral-900">
                        <label className="bg-neutral-900 input mt-4">
                        <svg className="h-[1em] bg-neutral-900 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                        <input type="search" className="w-full bg-neutral-900 focus:outline-none focus:ring-0 grow" placeholder="Search" />
                        </label>
                    </div>
                </div>
            </div>
            <div className="h-screen col-span-3 flex justify-center items-center text-3xl border border-neutral-800">
                Will add something here...
            </div>
        </div>
    )
}

        