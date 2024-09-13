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


const Dots = () => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Ellipsis size={19} className='mr-2' /> 
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <span>Edit</span>
          <DropdownMenuShortcut><Pencil/></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Delete</span>
          <DropdownMenuShortcut><Trash/></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator/>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default Dots