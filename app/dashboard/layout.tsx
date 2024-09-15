import { auth } from "@/auth";
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import { ReactNode } from "react"

const DashBoardLayout = async ({ children}: { children: ReactNode}) => {
  const session = await auth();

  if(!session?.user) {
    return redirect('/')
  }

  return (
    <div className="flex flex-col p-12 h-screen">
      <main className="shadow-glow overflow-hidden relative max-w-[28rem] mx-auto w-full h-full border-2 border-gray-200 rounded-3xl flex flex-col justify-between bg-gradient-to-b from-blue-700/50 via-purple-700/40 to-purple-800/20">
      <Navbar />
      <div className="p-2 overflow-y-auto scrollbar-hidden h-full mb-1">
        {children}
      </div>
        <Toaster />
        <Footer />
        </main>
    </div>
  )
}

export default DashBoardLayout