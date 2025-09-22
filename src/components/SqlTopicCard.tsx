import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Trophy } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface SqlTopicCardProps {
  title: string
  description: string
  problemCount: number
  difficulty: "Easy" | "Medium" | "Hard"
  estimatedTime: string
  icon: React.ReactNode
  completed?: number
}

export function SqlTopicCard({
  title,
  description,
  problemCount,
  difficulty,
  estimatedTime,
  icon,
  completed = 0
}: SqlTopicCardProps) {
  const navigate = useNavigate()
  const progress = (completed / problemCount) * 100

  const difficultyColors = {
    Easy: "bg-success text-success-foreground",
    Medium: "bg-warning text-warning-foreground", 
    Hard: "bg-destructive text-destructive-foreground"
  }

  const handleStartLearning = () => {
    // Navigate to first problem in this topic
    navigate('/problem/basic-select-1')
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:shadow-glow/20 bg-gradient-card border-border/50">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{problemCount} problems</p>
            </div>
          </div>
          <Badge className={`${difficultyColors[difficulty]} text-xs`}>
            {difficulty}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{estimatedTime}</span>
          </div>
          <div className="flex items-center space-x-1 text-success">
            <Trophy className="h-4 w-4" />
            <span>{completed}/{problemCount}</span>
          </div>
        </div>

        {progress > 0 && (
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-success h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-success font-medium">{Math.round(progress)}% Complete</p>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <Button 
          className="w-full group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all duration-300"
          variant="outline"
          onClick={handleStartLearning}
        >
          Start Learning
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  )
}