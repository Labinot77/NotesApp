"use client";

import { newVerification } from "@/acitons/new-verification";
import { SubmitButton } from "@/components/Buttons/Buttons";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";


const DynamicRoute = ({ params }: { params: { id: string } }) => {
  const { pending } = useFormStatus();
  const router = useRouter();
  const token = params.id;

  const onSubmit = async (e: React.FormEvent, token: string) => {
    e.preventDefault();

    if (!token) {
      toast({
        title: "Error",
        description: "Token not found",
      });
      return;
    }

    const result = await newVerification(token);

    if (result.success) {
      toast({
        title: "Success",
        description: result.success,
      });
      
      router.push("/authentication/sign-in");
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error,
      });
    }
  };

  return (
    <form className="flex w-full justify-center items-center h-screen" onSubmit={(e) => onSubmit(e, token)}>
      <SubmitButton title="Verify your email" pending={pending} />
    </form>
  );
};

export default DynamicRoute;
