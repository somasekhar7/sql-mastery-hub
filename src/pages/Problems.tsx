import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, ChevronDown, ChevronRight } from "lucide-react";
import { problemsData, conceptOrder } from "@/data/problemsData";
import { useAppSelector } from "@/hooks/useAppSelector";

const Problems = () => {
  const navigate = useNavigate();
  const [openConcepts, setOpenConcepts] = useState<string[]>(conceptOrder.slice(0, 1));
  const { solvedProblems, totalSolved, easyCount, mediumCount, hardCount } = useAppSelector((state) => state.progress);

  const problemsByConcept = problemsData.reduce((acc, problem) => {
    if (!acc[problem.concept]) {
      acc[problem.concept] = { Easy: [], Medium: [], Hard: [] };
    }
    acc[problem.concept][problem.difficulty].push(problem);
    return acc;
  }, {} as Record<string, { Easy: any[]; Medium: any[]; Hard: any[] }>);

  const difficultyColors = {
    Easy: "text-emerald-500",
    Medium: "text-amber-500",
    Hard: "text-rose-500"
  };

  const isProblemSolved = (problemId: string) => {
    return solvedProblems[problemId]?.solved || false;
  };

  const toggleConcept = (concept: string) => {
    setOpenConcepts(prev => 
      prev.includes(concept) 
        ? prev.filter(c => c !== concept)
        : [...prev, concept]
    );
  };

  const getConceptProgress = (concept: string) => {
    const conceptProblems = problemsData.filter(p => p.concept === concept);
    const solvedCount = conceptProblems.filter(p => isProblemSolved(p.id)).length;
    return { solved: solvedCount, total: conceptProblems.length };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8 max-w-7xl">
        {/* Stats Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">SQL Problems</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Total Progress</p>
                  <div className="text-4xl font-bold mb-1">
                    {totalSolved} / {problemsData.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((totalSolved / problemsData.length) * 100)}% completed
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-emerald-500/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Easy</p>
                  <div className="text-4xl font-bold text-emerald-500 mb-1">
                    {easyCount}
                  </div>
                  <p className="text-xs text-muted-foreground">completed</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-amber-500/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Medium</p>
                  <div className="text-4xl font-bold text-amber-500 mb-1">
                    {mediumCount}
                  </div>
                  <p className="text-xs text-muted-foreground">completed</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-rose-500/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Hard</p>
                  <div className="text-4xl font-bold text-rose-500 mb-1">
                    {hardCount}
                  </div>
                  <p className="text-xs text-muted-foreground">completed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Problems Grouped by Concept */}
        <div className="space-y-4">
          {conceptOrder.filter(concept => problemsByConcept[concept]).map((concept) => {
            const progress = getConceptProgress(concept);
            const isOpen = openConcepts.includes(concept);
            const allProblems = problemsData.filter(p => p.concept === concept);
            
            return (
              <Card key={concept} className="border-border">
                <Collapsible open={isOpen} onOpenChange={() => toggleConcept(concept)}>
                  <CollapsibleTrigger className="w-full">
                    <div className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4 flex-1">
                        {isOpen ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div className="text-left flex-1">
                          <h2 className="text-xl font-bold mb-2">{concept}</h2>
                          <div className="flex items-center gap-4">
                            <Progress 
                              value={(progress.solved / progress.total) * 100} 
                              className="w-48 h-2"
                            />
                            <span className="text-sm text-muted-foreground">
                              {progress.solved} / {progress.total}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="px-6 pb-6 space-y-6">
                      {(["Easy", "Medium", "Hard"] as const).map((difficulty) => {
                        const problems = problemsByConcept[concept][difficulty];
                        if (problems.length === 0) return null;

                        return (
                          <div key={difficulty}>
                            <div className="flex items-center gap-3 mb-3">
                              <Badge 
                                variant="outline" 
                                className={`${difficultyColors[difficulty]} border-current`}
                              >
                                {difficulty}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {problems.filter((p: any) => isProblemSolved(p.id)).length}/{problems.length} solved
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              {problems.map((problem: any) => {
                                const solved = isProblemSolved(problem.id);
                                
                                return (
                                  <div
                                    key={problem.id}
                                    className={`flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer hover:border-primary/50 ${
                                      solved ? "bg-primary/5 border-primary/30" : "bg-card"
                                    }`}
                                    onClick={() => navigate(`/problem/${problem.id}`)}
                                  >
                                    <div className="flex items-center gap-4 flex-1">
                                      {solved ? (
                                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                      ) : (
                                        <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                      )}
                                      
                                      <div className="flex-1">
                                        <h3 className="font-medium">{problem.title}</h3>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                          <span>⏱️ {problem.estimatedTime}</span>
                                          {solvedProblems[problem.id]?.attempts && (
                                            <span>🔄 {solvedProblems[problem.id].attempts} attempts</span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <Button variant="ghost" size="sm">
                                      {solved ? "Review" : "Solve"}
                                    </Button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Problems;
