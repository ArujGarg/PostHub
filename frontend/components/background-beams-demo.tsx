"use client"
import { LitButton } from "./LitButton"
import { BackgroundBeams } from "./ui/background-beams"
import { AnimatedPinDemo } from "./AnimatedPinDemo"


export default function BackgroundBeamsDemo() {
  return (
    <div className="bg-gray-900 ">   
        <div className=" w-full rounded-md bg-neutral-950 relative flex flex-col items-center antialiased overflow-auto overflow-contain">
            <div className="max-w-2xl mx-auto p-4 mt-16">
                <h1 className="relative z-10 text-lg md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300 text-center font-sans font-bold">
                    PostHub
                </h1>
                <p></p>
                <p className="text-neutral-300 max-w-lg mx-auto my-2 text-xl text-center relative z-10">
                A text-based social media platform to express your thoughts and connect through words.
                </p>
            </div>
            <div>
                <BackgroundBeams />
            </div>
            <div>
                <LitButton text="Get Started" />
            </div>
            <div>
                <AnimatedPinDemo />
            </div>
        </div>
    </div>
   
  )
}

