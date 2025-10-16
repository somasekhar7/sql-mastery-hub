import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, Trophy, TrendingUp } from "lucide-react";
import { problemsData, conceptOrder } from "@/data/problemsData";
import { useAppSelector } from "@/hooks/useAppSelector";

const Problems = () => {
  const navigate = useNavigate();
  const [selectedConcept, setSelectedConcept] = useState(conceptOrder[0]);
  const { solvedProblems, totalSolved, easyCount, mediumCount, hardCount } = useAppSelector((state) => state.progress);

  const problemsByConcept = problemsData.reduce((acc, problem) => {
    if (!acc[problem.concept]) {
      acc[problem.concept] = { Easy: [], Medium: [], Hard: [] };
    }
    acc[problem.concept][problem.difficulty].push(problem);
    return acc;
  }, {} as Record<string, { Easy: any[]; Medium: any[]; Hard: any[] }>);

  const difficultyColors = {
    Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Hard: "bg-rose-500/10 text-rose-500 border-rose-500/20"
  };

  const isProblemSolved = (problemId: string) => {
    return solvedProblems[problemId]?.solved || false;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Stats Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">SQL Problems</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Solved</p>
                    <p className="text-3xl font-bold mt-1">{totalSolved}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Easy</p>
                    <p className="text-3xl font-bold mt-1 text-emerald-500">{easyCount}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Medium</p>
                    <p className="text-3xl font-bold mt-1 text-amber-500">{mediumCount}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Hard</p>
                    <p className="text-3xl font-bold mt-1 text-rose-500">{hardCount}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-rose-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Concepts Navigation */}
        <div className="mb-6">
          <Tabs value={selectedConcept} onValueChange={setSelectedConcept}>
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto p-1">
              {conceptOrder.filter(concept => problemsByConcept[concept]).map((concept) => (
                <TabsTrigger key={concept} value={concept} className="whitespace-nowrap">
                  {concept}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Problems by Difficulty */}
        {selectedConcept && problemsByConcept[selectedConcept] && (
          <div className="space-y-8">
            {(["Easy", "Medium", "Hard"] as const).map((difficulty) => {
              const problems = problemsByConcept[selectedConcept][difficulty];
              if (problems.length === 0) return null;

              return (
                <div key={difficulty}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Badge className={difficultyColors[difficulty]} variant="outline">
                      {difficulty}
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      ({problems.filter((p: any) => isProblemSolved(p.id)).length}/{problems.length} solved)
                    </span>
                  </h2>
                  
                  <div className="grid gap-4">
                    {problems.map((problem: any) => {
                      const solved = isProblemSolved(problem.id);
                      
                      return (
                        <Card 
                          key={problem.id}
                          className={`hover:border-primary/50 transition-all cursor-pointer ${
                            solved ? "border-primary/30 bg-primary/5" : ""
                          }`}
                          onClick={() => navigate(`/problem/${problem.id}`)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-4 flex-1">
                                <div className="mt-1">
                                  {solved ? (
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </div>
                                
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-1">{problem.title}</h3>
                                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {problem.description.split('\n')[0]}
                                  </p>
                                  
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>⏱️ {problem.estimatedTime}</span>
                                    {solvedProblems[problem.id]?.attempts && (
                                      <span>🔄 {solvedProblems[problem.id].attempts} attempts</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <Button variant="outline" size="sm">
                                {solved ? "Review" : "Solve"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Problems;
