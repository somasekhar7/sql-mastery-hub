import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { User, Code, BookOpen } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
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
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <BookOpen className="h-4 w-4 mr-2" />
            Learn
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Problems
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Practice
          </Button>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button size="sm" className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}