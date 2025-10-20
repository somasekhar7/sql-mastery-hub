import { Button } from "@/components/ui/button"
import { CodeEditorVisual } from "@/components/CodeEditorVisual"
import { Database } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card py-20 lg:py-32">
      <div className="container relative">
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-primary-light/20 to-primary/20 border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-primary/30">
              <Database className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Master SQL with Interactive Learning</span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-fade-in">
              SQL Mastery Hub
            </h1>

            <p className="text-lg text-foreground/70 max-w-lg leading-relaxed animate-fade-in font-medium">
              The ultimate resource to prepare for data engineering interviews. 
              Everything you need, in one streamlined platform.
            </p>

            <div className="animate-fade-in">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground shadow-[0_0_30px_rgba(77,144,254,0.5)] hover:shadow-[0_0_50px_rgba(77,144,254,0.7)] transition-all duration-500 px-8 py-6 text-lg font-bold hover:scale-110 border-0 group"
              >
                <Database className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Start Learning SQL
              </Button>
            </div>
          </div>

          {/* Right Column - Code Editor Visual */}
          <div className="relative">
            <CodeEditorVisual />
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/10 to-primary-light/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-primary-light/10 to-primary/10 blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      </div>
    </section>
  )
}