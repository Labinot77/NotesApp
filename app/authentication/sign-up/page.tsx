import LoginWithOAuth from "@/components/Buttons/LoginWithOAuth";
import RegisterForm from "./Components/SignUpForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/actions/UserActions";


const SignUp = async () => {
  const session = await getUserSession();
  if (session?.id) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full flex mt-40 justify-center h-screen">
      <section className="flex flex-col w-[27rem]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">Register</h1>
        <small className="w-full text-center">Already have an account? <br />
          <Link className="text-purple-600 font-bold hover:underline" href="/authentication/sign-in">
          Sign in
          </Link>
          </small>
        <RegisterForm />
        <LoginWithOAuth />
      </section>
    </div>
  );
};

export default SignUp;