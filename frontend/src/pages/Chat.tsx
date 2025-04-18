import { ProfileSection } from "../../components/ProfileSection"
import { Sidebar } from "../../components/Sidebar"

export function Chat(){
    return (
        <div className="bg-neutral-900 flex justify-center w-full h-screen text-white grid grid-cols-12">
                    <div className="col-span-3">
                        <Sidebar />
                        <ProfileSection />
                    </div>
                    <div className="h-screen col-span-6  flex flex-col">
                        <Messaging />
                    </div>
                    <div className="h-screen col-span-3 flex justify-center  border border-neutral-800">
                        <UsersList />
                    </div>
                </div>
    )
}

export function UsersList(){
    return (
        <div>
            <div className="flex justify-center my-2">
                <input 
                className="mb-2 border min-w-xs rounded-md p-2 border-neutral-700" 
                type="text" 
                placeholder="Search users"></input>
            </div>
        </div>
    )
}

function Messaging(){
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow flex justify-center my-2 mx-16">
                <div className="max-w-4xl border border-neutral-700 h-full w-full rounded-md">

                </div>
            </div>

            <div className="w-full flex justify-center items-center ">
                <input
                    className="mb-2 border min-w-lg mx-1 rounded-md p-2 border-neutral-700"
                    type="text"
                    placeholder="Message..."
                />
                <button type="button" className=" text-white bg-purple-700 hover:bg-purple-800  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">Send</button>
            </div>
        </div>

    )
}