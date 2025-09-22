import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, Users, Star, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-28">
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-primary-light/20 text-primary-light border-primary-light/30 hover:bg-primary-light/30">
            <Star className="h-3 w-3 mr-1" />
            Master SQL with Interactive Learning
          </Badge>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl">
            Master SQL Through
            <span className="block bg-gradient-to-r from-white via-white to-primary-light bg-clip-text text-transparent">
              Practice & Projects
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80 sm:text-xl">
            Learn SQL from basics to advanced with interactive problems, real-world scenarios, 
            and AI-powered feedback. Join thousands of developers mastering database skills.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg font-semibold"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Start Learning
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-6 text-lg font-semibold"
            >
              Browse Problems
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-primary-foreground/60">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">10,000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">500+ Problems</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      </div>
    </section>
  )
}