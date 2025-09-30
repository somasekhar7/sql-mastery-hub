import { Button } from "@/components/ui/button"
import { CodeEditorVisual } from "@/components/CodeEditorVisual"
import { Database } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 lg:space-y-8">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground">
              SQL Mastery Hub
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl">
              The ultimate resource to prepare for data engineering interviews. 
              Everything you need, in one streamlined platform.
            </p>

            <div>
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary-light shadow-lg hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg font-semibold"
              >
                <Database className="mr-2 h-5 w-5" />
                Start Learning SQL
              </Button>
            </div>
          </div>

          {/* Right Column - Code Editor Visual */}
          <div className="relative lg:pl-8">
            <CodeEditorVisual />
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>
    </section>
  )
}