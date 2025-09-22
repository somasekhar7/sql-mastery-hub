import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { SqlTopicCard } from "@/components/SqlTopicCard"
import { sqlTopics } from "@/data/sqlTopics"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Award, BookOpen } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Index = () => {
  const navigate = useNavigate()
  const fundamentalTopics = sqlTopics.filter(topic => topic.category === "fundamentals")
  const intermediateTopics = sqlTopics.filter(topic => topic.category === "intermediate") 
  const advancedTopics = sqlTopics.filter(topic => topic.category === "advanced")

  const handleStartLearning = (topicId: string) => {
    // Navigate to first problem in this topic - for now using a sample problem
    navigate('/problem/basic-select-1')
  }

  const stats = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Active Learners",
      value: "12,500+",
      description: "Students mastering SQL"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-success" />,
      title: "Problems Solved",
      value: "850K+", 
      description: "Solutions submitted daily"
    },
    {
      icon: <Award className="h-6 w-6 text-warning" />,
      title: "Success Rate",
      value: "94%",
      description: "Job placement success"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-destructive" />,
      title: "Skill Improvement", 
      value: "3.2x",
      description: "Average performance boost"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-border/50">
                <CardHeader className="pb-3">
                  <div className="mx-auto mb-2">{stat.icon}</div>
                  <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-sm mb-1">{stat.title}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Learning Path</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master SQL through structured learning paths designed for every skill level. 
              From basic queries to advanced optimization techniques.
            </p>
          </div>

          {/* Fundamentals */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-success/10 text-success border-success/20">
                Fundamentals
              </Badge>
              <h3 className="text-xl font-semibold">Start Your SQL Journey</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fundamentalTopics.map((topic) => (
                <SqlTopicCard
                  key={topic.id}
                  title={topic.title}
                  description={topic.description}
                  problemCount={topic.problemCount}
                  difficulty={topic.difficulty}
                  estimatedTime={topic.estimatedTime}
                  icon={<topic.icon className="h-5 w-5 text-primary-foreground" />}
                  completed={topic.completed}
                  onStartLearning={() => handleStartLearning(topic.id)}
                />
              ))}
            </div>
          </div>

          {/* Intermediate */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-warning/10 text-warning border-warning/20">
                Intermediate
              </Badge>
              <h3 className="text-xl font-semibold">Build Advanced Skills</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {intermediateTopics.map((topic) => (
                <SqlTopicCard
                  key={topic.id}
                  title={topic.title}
                  description={topic.description}
                  problemCount={topic.problemCount}
                  difficulty={topic.difficulty}
                  estimatedTime={topic.estimatedTime}
                  icon={<topic.icon className="h-5 w-5 text-primary-foreground" />}
                  completed={topic.completed}
                  onStartLearning={() => handleStartLearning(topic.id)}
                />
              ))}
            </div>
          </div>

          {/* Advanced */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                Advanced
              </Badge>
              <h3 className="text-xl font-semibold">Master Complex Concepts</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedTopics.map((topic) => (
                <SqlTopicCard
                  key={topic.id}
                  title={topic.title}
                  description={topic.description}
                  problemCount={topic.problemCount}
                  difficulty={topic.difficulty}
                  estimatedTime={topic.estimatedTime}
                  icon={<topic.icon className="h-5 w-5 text-primary-foreground" />}
                  completed={topic.completed}
                  onStartLearning={() => handleStartLearning(topic.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Index
