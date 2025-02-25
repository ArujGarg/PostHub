
export const LitButton = ({text}: {text: string}) => {
    return <div>
        <button className="p-[3px] relative cursor-pointer">
            <div className="absolute inset-0 z-15 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 fixed inset-0 z-15 bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                {text}
            </div>
        </button>
    </div>
}
