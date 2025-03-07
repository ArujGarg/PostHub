"use client";
import { PinContainer } from "./ui/3d-pin";


export function AnimatedPinDemo() {
  return (
    <div className="h-[40rem] mt-12 mb-12 w-full flex items-center justify-center ">
      <PinContainer
        title="/https://github.com/ArujGarg"
        href="https://github.com/ArujGarg"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[60rem] h-[40rem] ">
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
        </div>
      </PinContainer>
    </div>
  );
}
