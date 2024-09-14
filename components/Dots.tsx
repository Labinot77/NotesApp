import { CreditCard, Ellipsis, Keyboard, Mail, Pencil, Settings, Trash, User, UserPlus, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { redirect } from 'next/navigation'


const Dots = ({ NoteId }: { NoteId: string }) => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Ellipsis size={19} className='mr-2' /> 
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuGroup>
          <DropdownMenuShortcut><Pencil/></DropdownMenuShortcut>
          <DropdownMenuShortcut><Trash/></DropdownMenuShortcut>
      </DropdownMenuGroup>
      <DropdownMenuSeparator/>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default Dots