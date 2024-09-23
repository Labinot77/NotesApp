"use client"

import { newVerification } from "@/acitons/new-verification";
import { Button } from "@/components/ui/button";
import { getVerificationTokenByEmail } from "@/data/verification-tokens";
import { toast } from "@/hooks/use-toast";
import { error } from "console";
import { useSession } from "next-auth/react";
import Link from "next/link";


const DynamicRoute = ({ params }: { params: {id: string }}) => {
  const token = params.id;
  // const session = useSession();
  // const userEmail = session.data?.user?.email;

  // if (!userEmail) {
  //   return { error: "Not authorized" };
  // }

  // const verificationToken = await getVerificationTokenByEmail(userEmail);
  
  // if (token === verificationToken?.token) {

  const onSubmit = async (token: string) => {
    if (!token) {
      toast({
        title: 'Error',
        description: 'Token not found',
      })
    }

    const result = await newVerification(token)
    
    if (result.success) {
      toast({
        title: 'Success',
        description: result.success,
      })
    } else if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
      })
    }
  }


  return (
    <main className="flex w-full justify-center items-center h-screen">
      <Button onClick={() => onSubmit(token)}>
        <Link href="/authentication/sign-in">
        Verify your email
      </Link>
      </Button>
  </main>
  );
}

export default DynamicRoute;
