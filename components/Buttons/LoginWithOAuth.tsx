"use client"

import React from 'react'
import { LoginGithub, LoginGoogle } from './LoginWithSocials'

const LoginWithOAuth = () => {
  return (
    <main className='p-2 mt-4 border-t-2 border-gray-500 flex gap-4 items-center justify-center'>
        <LoginGithub />
        <LoginGoogle />
    </main>
  )
}

export default LoginWithOAuth