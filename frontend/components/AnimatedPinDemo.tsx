"use client";
import { PinContainer } from "./ui/3d-pin";


export function AnimatedPinDemo() {
  return (
    <div className="h-[40rem] mt-8 mb-12 w-full flex items-center justify-center ">
      <PinContainer
        title="/https://github.com/ArujGarg"
        href="https://github.com/ArujGarg"
      >
        <div className="flex basis-full flex-col p-4 pt-5 tracking-tight text-slate-100/50 sm:basis-1/2 w-[60rem] h-[32rem] border border-black rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 ">
          <div>
            <img className="w-full h-auto self-center rounded-2xl " src="../landingscreenshot.jpg" alt="screenshot" />
          </div>
        </div>
      </PinContainer>
    </div>
  );
}


