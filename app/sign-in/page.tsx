import LoginWithOAuth from "@/components/Buttons/LoginWithOAuth";
import LoginForm from "@/components/Form/LoginForm";


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