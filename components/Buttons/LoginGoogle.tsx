"use client"

import { login } from '@/acitons/auth'
import { FaGoogle } from 'react-icons/fa'

const LoginGoogle = () => {
  return (
    <div
      onClick={() => login("google")}
      className="w-full gap-4 hover:cursor-pointer h-12 bg-green-800 rounded-md p-4 flex justify-center items-center">
      <FaGoogle size={25} className="text-white" />
    </div>
  )
}

export default LoginGoogle