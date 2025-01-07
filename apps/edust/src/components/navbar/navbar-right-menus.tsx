import {
  Cloud,
  Github,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Plus,
  School,
  Settings,
  User,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { signOut } from "@/app/features/authentication"
import { Link, useNavigate } from "react-router"
import { ThemeSwitch } from "../theme-switch"
import { useTheme } from "@/hooks"
import { Roles } from "@/types"
import { toast } from "sonner"
import { clearAllCaches } from "@/app/api/v0"

export const NavbarRightMenus = () => {
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.authentication)

  const handleLogout = () => {
    dispatch(signOut())
    clearAllCaches(dispatch)
    setTheme("light")
    navigate("/")
    toast.error("Log out successfully!")
  }

  return (
    <div className="flex items-center">
      <ThemeSwitch />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="#" alt="user profile" />
              <AvatarFallback>SN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {auth?.user?.name || "unknown"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {auth?.user?.email || "unknown@email"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem> */}
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <Link to={"/dashboard"}>
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/* if organization available */}

            {auth?.user?.organizationRoles &&
              auth?.user?.organizationRoles?.map((role) => (
                <Link to={'/organizations'} key={role.id}>
                  <DropdownMenuItem>
                    <School className="mr-2 h-4 w-4" />
                    <span
                      className={`capitalize ${role.role === Roles.OWNER && "font-bold"}`}
                    >
                      {role.organization.name.length > 21
                        ? role.organization.name.slice(0, 20) + "..."
                        : role.organization.name}
                    </span>
                  </DropdownMenuItem>
                </Link>
              ))}

            {/* if organization is not available */}
            {!auth?.user?.organizationRoles && (
              <Link to={"/organizations/create"}>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Create Organizations</span>
                </DropdownMenuItem>
              </Link>
            )}

            {/* <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite users</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Team</span>
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Cloud className="mr-2 h-4 w-4" />
            <span>API</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
