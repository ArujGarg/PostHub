import { useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function SearchUser(){
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setQuery(e.target.value);
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/search?query=${query}`);
            setUsers(response.data);
        } catch (error) {
            console.error("error fetching posts", error);
        }
    }

    return (
        <div>
            <div className="h-screen flex flex-col items-center">
                <div className="flex mt-4">
                    <div className="flex px-4 py-3 rounded-lg border-2 border-neutral-800 overflow-hidden w-80 mx-auto focus-within:border-violet-600">   
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                        className="fill-gray-400  mr-3 rotate-90">
                        <path
                            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                        </path>
                        </svg>
                        <input onChange={handleChange} type="email" placeholder="Who are you looking for?" className="max-w-xs w-80 outline-none bg-transparent text-white text-sm" />
                    </div>
                </div>
                <div>
                    {users.map(user => <DisplayUsers  user={user}/>)}
                </div>
            </div>
        </div>
    )
}

function DisplayUsers( {user}: {user: UserInterface }){
    return (
        <Link to={`/${user.username}`}>
            <div className="border w-80 flex border-neutral-800 mx-2 mt-2 rounded-lg cursor-pointer ">
                <div className="mt-1">
                    {user.profilePic ? user.profilePic : 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-14 cursor-pointer">
                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                    </svg>}
                </div>
                <div className="m-2 cursor-pointer">
                    <div>
                        {user.name}
                    </div>
                    <div>
                        {user.username}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export interface UserInterface {
    profilePic: string,
    username: string,
    name: string
}