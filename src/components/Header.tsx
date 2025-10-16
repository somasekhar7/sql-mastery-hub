import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LoginDialog } from "@/components/auth/LoginDialog"
import { RegisterDialog } from "@/components/auth/RegisterDialog"
import { useAppSelector, useAppDispatch } from "@/hooks"
import { logout } from "@/store/slices/authSlice"
import { User, Code, BookOpen, LogOut, Settings, MessageCircle } from "lucide-react"

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Code className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SQL Master
              </h1>
            </div>
          </div>

          <nav className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              className={location.pathname === '/' ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
              onClick={() => navigate('/')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Learn
            </Button>
            <Button 
              variant="ghost" 
              className={location.pathname === '/problems' ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
              onClick={() => navigate('/problems')}
            >
              Problems
            </Button>
            <Button 
              variant="ghost" 
              className={location.pathname === '/contact' ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
              onClick={() => navigate('/contact')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact
            </Button>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setLoginOpen(true)}>
                  Sign In
                </Button>
                <Button size="sm" className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0" onClick={() => setRegisterOpen(true)}>
                  <User className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <RegisterDialog open={registerOpen} onOpenChange={setRegisterOpen} />
    </>
  )
}
