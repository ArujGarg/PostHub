"use client"
import { LitButton } from "./LitButton"
import { BackgroundBeams } from "./ui/background-beams"
import { AnimatedPinDemo } from "./AnimatedPinDemo"
import { Navbar } from "./Navbar"


export default function BackgroundBeamsDemo() {
  return (
 
        <div className="w-full min-h-screen bg-neutral-900 relative flex flex-col items-center antialiased">
            <div className="w-full z-10">
                <Navbar />  
            </div>
            <div className="max-w-2xl mx-auto p-4 mt-16">
                <h1 className="relative z-10 text-lg md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300 text-center font-sans font-bold">
                    Post<span className="text-purple-500">Hub</span>
                </h1>
                <p className="text-neutral-300 max-w-lg mx-auto my-2 text-xl text-center relative z-10">
                    A text-based social media platform to express your thoughts and connect through words.
                </p>
            </div>
            <div >
                <BackgroundBeams />
            </div>
            <div className="z-10">
                <LitButton text="Get Started" />
            </div>
            <div className="z-10">
                <AnimatedPinDemo />
            </div>
        </div>
  )
}

