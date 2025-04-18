import axios  from "axios";
import { ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config";
import {  usePosts } from "../src/hooks";
import {useNavigate} from "react-router-dom"


export function Sidebar(){
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="bg-neutral-900 border border-neutral-800 w-full h-2/3 flex flex-col items-center gap-8">
            <div className="">
                <div className="m-4">
                    <span className="self-center text-4xl font-bold whitespace-nowrap cursor-pointer text-white">
                        P<span className="text-purple-500">H</span>
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <Link to={'/home'}>
                            <SidebarElement  svg={<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24" fill="white">
                                <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 10 21 L 10 14 L 14 14 L 14 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z"></path>
                            </svg>} text="Home" />
                        </Link>
                    </div>
                    <div>
                        <SidebarElement svg={<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24" fill="white">
                        <path d="M 12 2 C 11.172 2 10.5 2.672 10.5 3.5 L 10.5 4.1953125 C 7.9131836 4.862095 6 7.2048001 6 10 L 6 16 L 4.4648438 17.15625 L 4.4628906 17.15625 A 1 1 0 0 0 4 18 A 1 1 0 0 0 5 19 L 12 19 L 19 19 A 1 1 0 0 0 20 18 A 1 1 0 0 0 19.537109 17.15625 L 18 16 L 18 10 C 18 7.2048001 16.086816 4.862095 13.5 4.1953125 L 13.5 3.5 C 13.5 2.672 12.828 2 12 2 z M 10 20 C 10 21.1 10.9 22 12 22 C 13.1 22 14 21.1 14 20 L 10 20 z"></path>
                        </svg>} text="Notifications" />
                    </div>
                    <div>
                        <Link to={'/chat'}>
                            <SidebarElement svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-7">
                            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                            </svg>} text="Chat"/>
                        </Link>
                    </div>
                    <div>
                        <Link to={'/profile'}>
                            <SidebarElement svg={<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>} text="Profile"/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="m-2 mt-8">
                <button onClick={() => {
                    setShowModal(true)
                }} type="button" className="text-white w-40 bg-purple-500 focus:outline-none  font-medium rounded-full text-md px-10 py-3 text-center mb-2  hover:bg-purple-700 cursor-pointer">Post</button>
                {showModal && (
                    <div className=" flex justify-center fixed bg-black/30 min-h-screen w-screen h-screen z-10 text-white top-0 left-0">
                        <div className="flex justify-center items-center">
                            <PostComponent setShowModal={setShowModal}  />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}




function PostComponent({setShowModal}: {setShowModal: (value: boolean) => void}){
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {addNewPost} = usePosts();

    useEffect(() => {
        console.log("Updated loading state:", loading);
    }, [loading]); // Logs whenever `loading` changes

    
    return (
        <div className="bg-neutral-900 rounded-2xl w-150 shadow-lg shadow-black " >
            <div className="px-20 py-10 w-full ">
            <div className="relative w-full min-w-[200px]">
                <textarea onChange={(e) => {
                    setContent(e.target.value);
                }}
                className="peer h-full w-full min-h-[100px] w-full resize-none border-b-2 border-gray-400 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-violet-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-violet-500 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-red-500 placeholder:text-2xl caret-violet-500 caret-bold"
                placeholder="What's on your mind? ">
                </textarea>
               
            </div>
             </div>
             <div className="flex gap-4 m-6">
                <div className="text-white w-20 bg-purple-500 focus:outline-none  font-medium rounded-full text-md  py-3 text-center  hover:bg-purple-700 cursor-pointer">
                    <button onClick={() => {
                        setLoading(true)
                            axios.post(`${BACKEND_URL}/api/v1/post`,{content}, {
                                headers: {
                                    Authorization: localStorage.getItem("token")
                                }
                            }).then(response => {
                                addNewPost(response.data.post)
                            }).catch(error => {
                                console.error(error);
                                setLoading(false)
                            }).finally(() =>{
                                setShowModal(false); 
                                setLoading(false);
                            }) 

                        
                        
                    }} >
                        {loading ? <span className="loading loading-spinner loading-sm"></span>: 'Post'}</button>
                </div>
                <div onClick={() => setShowModal(false)} className="text-white w-25 bg-gray-500 focus:outline-none  font-medium rounded-full text-md  py-3 text-center  hover:bg-gray-700 cursor-pointer">
                    <button>Cancel</button>
                </div>
            </div>
        </div>
       
    )
}


interface SidebarElementProps {
    svg: ReactNode,
    text: string
}
function SidebarElement({svg, text}: SidebarElementProps){
    return (
    <div className="flex items-center gap-2 p-2 hover:bg-neutral-800 rounded-md cursor-pointer">
        <div>
            {svg}
        </div>
        <div className="text-xl">
            {text}
        </div>        
    </div>
    )
}




<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
    <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 10 21 L 10 14 L 14 14 L 14 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z"></path>
</svg>