import LoginWithOAuth from "@/components/Buttons/LoginWithOAuth";
import LoginForm from "@/components/Form/LoginForm";
import RegisterForm from "@/components/Form/RegisterForm";
import Link from "next/link";


const SignUp = () => {
  return (
    <div className="w-full flex mt-40 justify-center h-screen">
      <section className="flex flex-col w-[27rem]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">Login</h1>
        <small className="w-full text-center">Dont have an account? <br />
          <Link className="text-purple-600 font-bold underline" href="/authentication/sign-up">
          Sign up
          </Link>
          </small>
        <LoginForm />
        <LoginWithOAuth />
      </section>
    </div>
  );
};

export default SignUp;