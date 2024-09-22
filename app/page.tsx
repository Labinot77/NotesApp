
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth()


  return (
    <section className="flex items-center justify-center h-screen body-background">
    <div className="relative items-center w-full px-5 py-12 mx-auto z-10 lg:px-16 max-w-7xl md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <div>
          <span className="w-auto px-6 py-3 rounded-full bg-secondary">
           <span className="text-sm font-medium text-primary ">
           Sort your notes easily
            </span>
          </span>
 
          <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl ">Create Notes with <span className="block bg-clip-text text-transparent from-blue-500 to-purple-700 via-pink-400 bg-gradient-to-r animate-bounce">ease</span></h1>
          <p className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold max-w-lg mx-auto my-2 text-lg text-center">
            With our intuitive platform, organizing and creating notes has never been simpler. Whether you're jotting down quick ideas or drafting detailed plans, our tools help you stay on top of it all. Start simplifying your workflow and keep everything neatly in one place.</p>
        </div>
        {(await session?.user) ? (
          <div className="mt-16 w-full">
           <Link
           href='/dashboard/new'>
            <Button>
              Create a new note
            </Button>
           </Link>
          </div>
         ) : ( 
          <div className="flex justify-center max-w-sm mx-auto mt-10">
          <Link href='/authentication/sign-up'>
          <Button size="lg" className="w-full z-10 ">Sign up for free</Button>
          </Link>
        </div>
         )}
      </div>
    </div>
  </section>
  );
}
