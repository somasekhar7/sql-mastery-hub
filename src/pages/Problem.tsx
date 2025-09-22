import { useState } from "react"
import { Header } from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge" 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { 
  Play, 
  Save, 
  Bot, 
  Eye, 
  Clock, 
  Trophy, 
  Lightbulb,
  CheckCircle,
  XCircle 
} from "lucide-react"

// Sample problem data
const problemData = {
  id: "basic-select-1",
  title: "Employee Information Query",
  difficulty: "Easy" as const,
  category: "Basic Queries",
  description: `
Write a SQL query to retrieve all employee information from the 'employees' table where the salary is greater than 50000.

**Table Schema:**
\`\`\`sql
employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(50),
  salary DECIMAL(10,2),
  hire_date DATE
)
\`\`\`

**Sample Data:**
| id | name | department | salary | hire_date |
|----|------|------------|--------|-----------|
| 1 | John Doe | Engineering | 75000 | 2022-01-15 |
| 2 | Jane Smith | Marketing | 45000 | 2022-02-20 |
| 3 | Bob Johnson | Engineering | 80000 | 2021-11-10 |

**Expected Output:**
Should return employees with salary > 50000, ordered by salary descending.
  `,
  hints: [
    "Use the SELECT statement to choose columns",
    "Apply WHERE clause for salary condition", 
    "Consider using ORDER BY for sorting results",
    "Remember to use proper comparison operators"
  ],
  initialCode: "-- Write your SQL query here\nSELECT ",
  solution: "SELECT * FROM employees WHERE salary > 50000 ORDER BY salary DESC;",
  testCases: [
    {
      description: "Basic functionality test",
      expected: "Returns 2 rows with John Doe and Bob Johnson"
    },
    {
      description: "Sorting verification",
      expected: "Results ordered by salary descending (80000, 75000)"
    }
  ]
}

const Problem = () => {
  const [code, setCode] = useState(problemData.initialCode)
  const [isRunning, setIsRunning] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [testsPassed, setTestsPassed] = useState<boolean | null>(null)
  const { theme } = useTheme()

  const handleRunCode = async () => {
    setIsRunning(true)
    // Simulate code execution
    setTimeout(() => {
      setResults([
        { id: 3, name: "Bob Johnson", department: "Engineering", salary: 80000, hire_date: "2021-11-10" },
        { id: 1, name: "John Doe", department: "Engineering", salary: 75000, hire_date: "2022-01-15" }
      ])
      setTestsPassed(true)
      setIsRunning(false)
    }, 2000)
  }

  const handleAIFeedback = () => {
    // AI feedback functionality will be implemented with backend
    console.log("AI Feedback requested")
  }

  const difficultyColors = {
    Easy: "bg-success text-success-foreground",
    Medium: "bg-warning text-warning-foreground",
    Hard: "bg-destructive text-destructive-foreground"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-6">
        <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-120px)]">
          {/* Problem Description Panel */}
          <ResizablePanel defaultSize={45} minSize={30}>
            <div className="h-full flex flex-col">
              {/* Problem Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">{problemData.title}</h1>
                  <Badge className={difficultyColors[problemData.difficulty]}>
                    {problemData.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    {problemData.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    ~15 min
                  </span>
                </div>
              </div>

              {/* Problem Content */}
              <div className="flex-1 overflow-y-auto">
                <Tabs defaultValue="description" className="h-full">
                  <TabsList className="grid w-full grid-cols-3 mx-6 mt-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="hints">
                      <Lightbulb className="h-4 w-4 mr-1" />
                      Hints ({problemData.hints.length})
                    </TabsTrigger>
                    <TabsTrigger value="solution">
                      <Eye className="h-4 w-4 mr-1" />
                      Solution
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="p-6 pt-4">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <div dangerouslySetInnerHTML={{ __html: problemData.description.replace(/\n/g, '<br/>') }} />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="hints" className="p-6 pt-4">
                    <div className="space-y-3">
                      {problemData.hints.map((hint, index) => (
                        <Card key={index} className="border-border/50">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-semibold">
                                {index + 1}
                              </div>
                              <p className="text-sm">{hint}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="solution" className="p-6 pt-4">
                    <Card className="border-warning/30 bg-warning/5">
                      <CardHeader>
                        <CardTitle className="text-warning flex items-center gap-2">
                          <Eye className="h-5 w-5" />
                          Solution Revealed
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-code-bg p-4 rounded-lg text-sm font-mono overflow-x-auto">
                          <code>{problemData.solution}</code>
                        </pre>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={55} minSize={40}>
            <div className="h-full flex flex-col">
              {/* Editor Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                <h3 className="font-semibold">SQL Editor</h3>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCode(problemData.initialCode)}
                  >
                    Reset
                  </Button>
                  <Button size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1">
                  <Editor
                    height="60%"
                    defaultLanguage="sql"
                    theme={theme === "dark" ? "vs-dark" : "vs"}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      wordWrap: "on",
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      insertSpaces: true,
                    }}
                  />
                </div>

                <Separator />

                {/* Results Panel */}
                <div className="h-[40%] bg-editor-bg border-t border-editor-border">
                  <Tabs defaultValue="output" className="h-full">
                    <div className="flex items-center justify-between p-3 border-b border-editor-border">
                      <TabsList>
                        <TabsTrigger value="output">Output</TabsTrigger>
                        <TabsTrigger value="tests">Test Results</TabsTrigger>
                      </TabsList>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          onClick={handleAIFeedback}
                          variant="outline"
                        >
                          <Bot className="h-4 w-4 mr-1" />
                          AI Feedback
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={handleRunCode}
                          disabled={isRunning}
                          className="bg-gradient-primary hover:opacity-90"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          {isRunning ? "Running..." : "Run Code"}
                        </Button>
                      </div>
                    </div>

                    <TabsContent value="output" className="p-3 h-full overflow-y-auto">
                      {results.length > 0 ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="text-success">Query executed successfully</span>
                          </div>
                          <div className="bg-card rounded border">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b bg-muted/50">
                                  {Object.keys(results[0] || {}).map((key) => (
                                    <th key={key} className="text-left p-2 font-medium">
                                      {key}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {results.map((row, index) => (
                                  <tr key={index} className="border-b">
                                    {Object.values(row).map((value: any, i) => (
                                      <td key={i} className="p-2">
                                        {value}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <p>Run your query to see results</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="tests" className="p-3 h-full overflow-y-auto">
                      <div className="space-y-3">
                        {problemData.testCases.map((test, index) => (
                          <Card key={index} className="border-border/50">
                            <CardContent className="p-3">
                              <div className="flex items-center gap-2 mb-2">
                                {testsPassed === true ? (
                                  <CheckCircle className="h-4 w-4 text-success" />
                                ) : testsPassed === false ? (
                                  <XCircle className="h-4 w-4 text-destructive" />
                                ) : (
                                  <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                                )}
                                <span className="font-medium text-sm">Test {index + 1}: {test.description}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{test.expected}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default Problem