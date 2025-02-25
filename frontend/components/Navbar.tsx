export const Navbar = () => {
    return <div >
        <nav className="bg-neutral-900 border-b border-neutral-800 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
                    PostHub
                </span>
            <div className="hidden w-full md:block md:w-auto  " id="navbar-default">
            <ul className="font-medium flex flex-row p-4 md:p-0 mt-4 border rounded-lg bg-neutral-900  md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 items-center ">
                    <div className="border-1 px-2 border-neutral-800 cursor-pointer  hover:bg-gradient-to-r from-indigo-500 to-purple-500 rounded-sm">
                        <svg className="my-2" width="24px" height="24px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#FFFFFF" strokeWidth={3}>
                        <path d="M8 24h40v24a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8V24z"/><line x1="28" y1="16" x2="28" y2="8"/><line x1="16" y1="16" x2="16" y2="8"/><line x1="40" y1="16" x2="40" y2="8"/>
                        <path d="M48 44h5.42A2.59 2.59 0 0 0 56 41.42v-6.84A2.59 2.59 0 0 0 53.42 32H48"/>
                        </svg>
                    </div>
                    <div>
                        <div className=" md:border-1  border-neutral-800 flex flex-row items-center rounded-sm  hover:bg-gradient-to-r from-indigo-500 to-purple-500 ">
                            <svg fill="#FFFFFF" width="24px" height="24px" stroke="FFFFFF" viewBox="-2 -2.5 24 24" strokeWidth={1} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-star ml-2"><path d='M10 13.554l3.517 1.85-.672-3.917 2.846-2.774-3.932-.571L10 4.579 8.241 8.142l-3.932.571 2.846 2.774-.672 3.916L10 13.554zm0 2.26L3.827 19.06l1.179-6.875L.01 7.317l6.902-1.003L10 .06l3.087 6.254 6.902 1.003-4.995 4.868 1.18 6.875L10 15.814z'/></svg>
                            <a href="#" className="block py-2 px-3 text-gray-900 p-2 text-white  bg-transparent">Star this project</a>
                        </div>
                    </div>
                    <div>
                        <a href="#" className="block py-2 px-3 h-10 text-gray-900 rounded-sm   hover:bg-gradient-to-r from-indigo-500 to-purple-500  md:border-1 md:p-2 text-white bg-transparent border-neutral-800">Login</a>
                    </div>    
            </ul>
            </div>
        </div>
        </nav>

    </div>
}