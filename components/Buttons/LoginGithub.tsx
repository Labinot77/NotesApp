"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import { loginWithSocial } from "@/acitons/LoginSocial";

const LoginGithub = () => {
  // const onClick = async () => {
  //   const res = await loginWithSocial("github")

    // if (res?.error) {
    //   toast({
    //     title: "Login Error",
    //     description: res.error,
    //   })
    // } else {
    //   toast({
    //     title: res.title,
    //     description: res.description,
    //   })
    // }
  // }
  
  return (
    <div
      onClick={() => loginWithSocial("github")}
      className="w-full gap-4 hover:cursor-pointer h-12 bg-black rounded-md p-4 flex justify-center items-center">
      <FaGithub size={25} className="text-white" />
    </div>
  );
};

export default LoginGithub;