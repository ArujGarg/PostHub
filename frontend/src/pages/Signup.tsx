"use client";
import React, { useState } from "react";
import { SignupInput } from "@arujgarg/posthub-common"
import axios from "axios";
import { BACKEND_URL } from "../../config"


import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { BackgroundBeams } from "../../components/ui/background-beams";
import { Link, useNavigate } from "react-router-dom";

export function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "", 
    name: "",
    username: "",
    password: "",
  })

  async function sendRequest(){
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/home")

    } catch (error) {
      //alert user that the request failed
    }
  }

  return (
    <div className="">
      <div className="fixed inset-0 -z-10 bg-neutral-900 h-screen ">
        <BackgroundBeams />
      </div>
      <div className="max-w-md w-full mx-auto my-16 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-950 ">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
            Signup to Posthub
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Already have an account? 
            <Link className="underline pl-2 hover:text-violet-500" to={"/signin"}>Login</Link>
          </p>
        </div>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">Display Name</Label>
              <Input id="firstname" placeholder="John Doe" type="text" onChange={(e => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value
                })
              })}/>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Username</Label>
              <Input id="lastname" placeholder="johndoe123" type="text" onChange={e => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value
                })
              }} />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="johndoe@gmail.com" type="email" onChange={e => {
              setPostInputs({
                ...postInputs,
                email: e.target.value
              })
            }} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password"  onChange={e => {
              setPostInputs({
                ...postInputs,
                password: e.target.value
              })
            }}/>
          </LabelInputContainer>

          <button
            onClick={sendRequest}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] cursor-pointer"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] cursor-pointer"
              type="submit"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                GitHub
              </span>
              <BottomGradient />
            </button>
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] cursor-pointer"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};


interface LabelInputType {
  children: React.ReactNode;
  className?: string;
}
const LabelInputContainer = ({
  children,
  className,
}: LabelInputType) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
