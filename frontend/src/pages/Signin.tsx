"use client";
import React, { useState } from "react";



import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { BackgroundBeams } from "../../components/ui/background-beams";
import { Link, useNavigate } from "react-router-dom";
import { SigninInput } from "@arujgarg/posthub-common";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export function SigninFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    username: "",
    password: ""
  })

  async function sendRequest(){
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate('/home')
    } catch (error) {
      alert("error while signing in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="">
      <div className="fixed inset-0 -z-10 bg-neutral-900 h-screen ">
        <BackgroundBeams />
      </div>
      <div className="max-w-md w-full mx-auto my-25 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-950 ">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
            Signin to Posthub
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Don't have an account?
            <Link className="pl-2 underline hover:text-violet-500" to={"/signup"}>Signup</Link>
          </p>
        </div>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email or username</Label>
            <Input id="email" placeholder="johndoe@gmail.com" type="email" onChange={e => {
              setPostInputs({
                ...postInputs,
                email: e.target.value
              })
            }} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" onChange={e => {
              setPostInputs({
                ...postInputs,
                password: e.target.value
              })
            }} />
          </LabelInputContainer>

          <button
            onClick={sendRequest}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] cursor-pointer"
            type="submit"
          >{loading ? <span className="loading loading-spinner loading-sm"></span> : 'Sign in \u2192'}
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

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
