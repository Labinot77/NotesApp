"use client";

import { login } from "@/acitons/auth";
import React from "react";
import { FaGithub } from "react-icons/fa";

const LoginGithub = () => {
  return (
    <div
      onClick={() => login("github")}
      className="w-full gap-4 hover:cursor-pointer h-12 bg-black rounded-md p-4 flex justify-center items-center">
      <FaGithub size={25} className="text-white" />
    </div>
  );
};

export default LoginGithub;