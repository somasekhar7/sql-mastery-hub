import { 
  Database, 
  Table, 
  Link, 
  Shuffle, 
  Filter, 
  BarChart3, 
  Settings, 
  Lock,
  FileText,
  Zap 
} from "lucide-react"

export interface SqlTopic {
  id: string
  title: string
  description: string
  problemCount: number
  difficulty: "Easy" | "Medium" | "Hard"
  estimatedTime: string
  icon: React.ComponentType<{ className?: string }>
  completed?: number
  category: "fundamentals" | "intermediate" | "advanced"
}

export const sqlTopics: SqlTopic[] = [
  // Fundamentals
  {
    id: "crud-operations",
    title: "CRUD Operations",
    description: "Master the fundamentals of Create, Read, Update, and Delete operations in SQL. Learn to manipulate data effectively with INSERT, SELECT, UPDATE, and DELETE statements.",
    problemCount: 25,
    difficulty: "Easy",
    estimatedTime: "2-3 hours",
    icon: Database,
    completed: 8,
    category: "fundamentals"
  },
  {
    id: "basic-queries",
    title: "Basic Queries",
    description: "Learn to write simple SELECT statements with filtering, sorting, and basic conditions using WHERE, ORDER BY, and LIMIT clauses.",
    problemCount: 20,
    difficulty: "Easy", 
    estimatedTime: "2 hours",
    icon: FileText,
    completed: 12,
    category: "fundamentals"
  },
  {
    id: "data-types",
    title: "Data Types & Constraints",
    description: "Understand different SQL data types, primary keys, foreign keys, and table constraints to design robust database schemas.",
    problemCount: 15,
    difficulty: "Easy",
    estimatedTime: "1.5 hours",
    icon: Table,
    completed: 3,
    category: "fundamentals"
  },

  // Intermediate
  {
    id: "joins",
    title: "Joins & Relationships", 
    description: "Master INNER, LEFT, RIGHT, and FULL OUTER joins to combine data from multiple tables. Learn about cross joins and self joins.",
    problemCount: 30,
    difficulty: "Medium",
    estimatedTime: "4-5 hours",
    icon: Link,
    completed: 5,
    category: "intermediate"
  },
  {
    id: "aggregate-functions",
    title: "Aggregate Functions",
    description: "Learn COUNT, SUM, AVG, MIN, MAX and GROUP BY clauses. Master HAVING conditions and statistical functions for data analysis.",
    problemCount: 22,
    difficulty: "Medium",
    estimatedTime: "3 hours",
    icon: BarChart3,
    completed: 0,
    category: "intermediate"
  },
  {
    id: "subqueries",
    title: "Subqueries & CTEs",
    description: "Write complex nested queries, correlated subqueries, and Common Table Expressions (CTEs) for advanced data retrieval patterns.",
    problemCount: 28,
    difficulty: "Medium",
    estimatedTime: "4 hours",
    icon: Shuffle,
    completed: 0,
    category: "intermediate"
  },

  // Advanced
  {
    id: "window-functions",
    title: "Window Functions",
    description: "Master advanced analytical functions like ROW_NUMBER(), RANK(), LEAD(), LAG(), and statistical window functions for complex analytics.",
    problemCount: 35,
    difficulty: "Hard",
    estimatedTime: "6-8 hours",
    icon: Filter,
    completed: 0,
    category: "advanced"
  },
  {
    id: "stored-procedures",
    title: "Stored Procedures & Functions",
    description: "Create reusable database logic with stored procedures, functions, triggers, and control flow statements.",
    problemCount: 18,
    difficulty: "Hard", 
    estimatedTime: "5 hours",
    icon: Settings,
    completed: 0,
    category: "advanced"
  },
  {
    id: "transactions",
    title: "Transactions & Concurrency",
    description: "Learn transaction control with COMMIT, ROLLBACK, SAVEPOINT. Understand isolation levels and handling concurrent database access.",
    problemCount: 20,
    difficulty: "Hard",
    estimatedTime: "4-5 hours",
    icon: Lock,
    completed: 0,
    category: "advanced"
  },
  {
    id: "performance",
    title: "Performance & Optimization",
    description: "Optimize query performance with indexes, execution plans, query hints, and advanced optimization techniques.",
    problemCount: 25,
    difficulty: "Hard",
    estimatedTime: "6 hours",
    icon: Zap,
    completed: 0,
    category: "advanced"
  }
]