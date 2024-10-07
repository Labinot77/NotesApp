import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { ReactNode } from "react"

const DashBoardLayout = async ({ children}: { children: ReactNode}) => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <main className="overflow-hidden relative max-w-6xl p-2 mx-auto w-full h-full flex flex-col justify-between ">
      <Navbar />
      <div className="p-2 overflow-y-auto h-full ">
        {children}
      </div>
        <Footer />
        </main>
    </div>
  )
}

export default DashBoardLayout