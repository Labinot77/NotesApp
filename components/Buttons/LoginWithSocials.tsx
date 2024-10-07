"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import { loginWithSocial } from "@/acitons/LoginSocial";
import { FaGoogle } from 'react-icons/fa'

export const LoginGithub = () => {
  return (
    <div
      onClick={() => loginWithSocial("github")}
      className="w-full gap-4 hover:cursor-pointer h-12 bg-black rounded-md p-4 flex justify-center items-center">
      <FaGithub size={25} className="text-white" />
    </div>
  );
};

export const LoginGoogle = () => {  
  return (
    <div
      onClick={() => loginWithSocial("google")}
      className="w-full gap-4 hover:cursor-pointer h-12 bg-green-800 rounded-md p-4 flex justify-center items-center">
      <FaGoogle size={25} className="text-white" />
    </div>
  )
}
