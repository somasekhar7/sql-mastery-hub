import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { problemsData, levelOrder, conceptsByLevel } from "@/data/problemsData";
import { useAppSelector } from "@/hooks/useAppSelector";

const Problems = () => {
  const navigate = useNavigate();
  const [openLevels, setOpenLevels] = useState<string[]>(['Fundamentals']);
  const [openConcepts, setOpenConcepts] = useState<string[]>([]);
  const { solvedProblems, totalSolved, easyCount, mediumCount, hardCount } = useAppSelector((state) => state.progress);

  const difficultyColors = {
    Easy: "text-emerald-500 border-emerald-500",
    Medium: "text-amber-500 border-amber-500",
    Hard: "text-rose-500 border-rose-500"
  };

  const levelEmoji = {
    Fundamentals: "🟢",
    Intermediate: "🟡",
    Advanced: "🔵"
  };

  const isProblemSolved = (problemId: string) => {
    return solvedProblems[problemId]?.solved || false;
  };

  const toggleLevel = (level: string) => {
    setOpenLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const toggleConcept = (concept: string) => {
    setOpenConcepts(prev => 
      prev.includes(concept) 
        ? prev.filter(c => c !== concept)
        : [...prev, concept]
    );
  };

  const getLevelProgress = (level: string) => {
    const levelProblems = problemsData.filter(p => p.level === level);
    const solvedCount = levelProblems.filter(p => isProblemSolved(p.id)).length;
    return { solved: solvedCount, total: levelProblems.length };
  };

  const getConceptProgress = (concept: string) => {
    const conceptProblems = problemsData.filter(p => p.concept === concept);
    const solvedCount = conceptProblems.filter(p => isProblemSolved(p.id)).length;
    return { solved: solvedCount, total: conceptProblems.length };
  };

  const getConceptDescription = (concept: string): string => {
    const descriptions: Record<string, string> = {
      'Data Retrieval Queries': 'SELECT, FROM, WHERE',
      'Filtering and Sorting Data': 'ORDER BY, DISTINCT, LIMIT, BETWEEN, IN',
      'Aggregation and Summary Functions': 'COUNT, SUM, AVG, MIN, MAX',
      'Grouping and Conditional Aggregation': 'GROUP BY, HAVING',
      'Introductory Table Joins': 'INNER JOIN, LEFT JOIN, RIGHT JOIN',
      'Column Aliasing and Core SQL Functions': 'AS, CONCAT, LENGTH, UPPER, LOWER',
      'Advanced Joins and Set Operations': 'FULL OUTER JOIN, UNION, INTERSECT, EXCEPT',
      'Subqueries and Nested Logic': 'IN, EXISTS, Correlated Subqueries',
      'Conditional Expressions': 'CASE, WHEN, THEN, ELSE',
      'String and Date Manipulation': 'SUBSTRING, REPLACE, DATE_FORMAT, EXTRACT',
      'Data Manipulation Statements': 'INSERT, UPDATE, DELETE',
      'Analytical and Window Functions': 'ROW_NUMBER, RANK, DENSE_RANK, PARTITION BY',
      'Common Table Expressions (CTEs)': 'WITH clause, Recursive CTEs',
      'Query Optimization and Indexing': 'Indexes, Query Optimization, Execution Plans',
      'Database Normalization and Schema Design': '1NF, 2NF, 3NF, Entity Relationships',
      'Transactions and Concurrency Control': 'COMMIT, ROLLBACK, SAVEPOINT, ACID Properties',
      'Stored Procedures and Triggers': 'CREATE PROCEDURE, CREATE TRIGGER, EXECUTE',
      'JSON and Advanced Data Types': 'JSON_EXTRACT, JSON_OBJECT, ARRAY Functions'
    };
    return descriptions[concept] || '';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">SQL Problems</h1>
          </div>
          
          {/* Stats Cards */}
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

        {/* Problems Organized by Level */}
        <div className="space-y-6">
          {levelOrder.map((level) => {
            const levelProgress = getLevelProgress(level);
            const isLevelOpen = openLevels.includes(level);
            const concepts = conceptsByLevel[level];
            
            return (
              <Card key={level} className="border-2">
                <Collapsible open={isLevelOpen} onOpenChange={() => toggleLevel(level)}>
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          {isLevelOpen ? (
                            <ChevronDown className="h-6 w-6 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-6 w-6 text-muted-foreground" />
                          )}
                          <div className="text-left flex-1">
                            <CardTitle className="text-2xl flex items-center gap-3">
                              <span>{levelEmoji[level as keyof typeof levelEmoji]}</span>
                              <span>{level}</span>
                            </CardTitle>
                            <div className="flex items-center gap-4 mt-3">
                              <Progress 
                                value={(levelProgress.solved / levelProgress.total) * 100} 
                                className="w-64 h-2"
                              />
                              <span className="text-sm text-muted-foreground font-normal">
                                {levelProgress.solved} / {levelProgress.total} solved
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="px-6 pb-6 space-y-4">
                      {concepts.map((concept) => {
                        const conceptProgress = getConceptProgress(concept);
                        const isConceptOpen = openConcepts.includes(concept);
                        const conceptProblems = problemsData.filter(p => p.concept === concept);
                        const description = getConceptDescription(concept);
                        
                        return (
                          <Card key={concept} className="border-border bg-muted/20">
                            <Collapsible open={isConceptOpen} onOpenChange={() => toggleConcept(concept)}>
                              <CollapsibleTrigger className="w-full">
                                <div className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-lg">
                                  <div className="flex items-center gap-3 flex-1">
                                    {isConceptOpen ? (
                                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <div className="text-left flex-1">
                                      <h3 className="font-semibold text-lg">{concept}</h3>
                                      <p className="text-xs text-muted-foreground mt-1">{description}</p>
                                      <div className="flex items-center gap-3 mt-2">
                                        <Progress 
                                          value={(conceptProgress.solved / conceptProgress.total) * 100} 
                                          className="w-48 h-1.5"
                                        />
                                        <span className="text-xs text-muted-foreground">
                                          {conceptProgress.solved} / {conceptProgress.total}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CollapsibleTrigger>
                              
                              <CollapsibleContent>
                                <div className="px-4 pb-4 space-y-2">
                                  {conceptProblems.map((problem) => {
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
                                            <div className="flex items-center gap-2">
                                              <h4 className="font-medium">{problem.title}</h4>
                                              <Badge 
                                                variant="outline" 
                                                className={`text-xs ${difficultyColors[problem.difficulty]}`}
                                              >
                                                {problem.difficulty}
                                              </Badge>
                                            </div>
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
                              </CollapsibleContent>
                            </Collapsible>
                          </Card>
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
