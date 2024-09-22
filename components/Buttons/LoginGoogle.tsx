"use client"

import { loginWithSocial } from '@/acitons/LoginSocial'
import { FaGoogle } from 'react-icons/fa'

const LoginGoogle = () => {
  // const onClick = async () => {
  //   const res = await loginWithSocial("google")

  //   if (res?.error) {
  //     toast({
  //       title: "Login Error",
  //       description: res.error,
  //     })
  //   } else {
  //     toast({
  //       title: res.title,
  //       description: res.description,
  //     })
  //   }
  // }
  
  return (
    <div
      onClick={() => loginWithSocial("google")}
      className="w-full gap-4 hover:cursor-pointer h-12 bg-green-800 rounded-md p-4 flex justify-center items-center">
      <FaGoogle size={25} className="text-white" />
    </div>
  )
}

export default LoginGoogle