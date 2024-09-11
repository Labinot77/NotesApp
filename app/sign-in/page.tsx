
import LoginForm from "@/components/LoginForm";
import LoginGithub from "@/components/LoginGithub";
import LoginGoogle from "@/components/LoginGoogle";
import LoginWithOAuth from "@/components/LoginWithOAuth";
import React from "react";

const SignIn = () => {
  return (
    <div className="w-full flex mt-40 justify-center h-screen">
      <section className="flex flex-col w-[27rem]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">Sign in</h1>
        <LoginForm />
        <LoginWithOAuth />
      </section>
    </div>
  );
};

export default SignIn;