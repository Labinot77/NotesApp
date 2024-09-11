import { auth } from "@/auth";
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import { ReactNode } from "react"

const DashBoardLayout = async ({ children}: { children: ReactNode}) => {
  const session = await auth();
  // const { getUser } = getKindeServerSession()
  // const user = await getUser()
  // const data = await getUserData(user?.id as string)


  if(!session?.user) {
    return redirect('/')
  }

  // await getData({ 
  //   email: user.email as string, 
  //   firstName: user.given_name as string, 
  //   lastName: user.family_name as string, 
  //   id: user.id as string,
  //   image: user.picture as string
  // })
  return (
    <div className="flex flex-col p-12 h-screen">
      <main className="overflow-hidden relative max-w-[28rem] mx-auto w-full h-full border-2 border-gray-200 rounded-3xl flex flex-col justify-between bg-gradient-to-b from-blue-700/50 via-purple-700/40 to-purple-800/20">
      <Navbar />
      <div className="p-2 overflow-y-auto scrollbar-hidden h-full ">
        {children}
      </div>
        <Toaster />
        <Footer />
        </main>
    </div>
  )
}

export default DashBoardLayout