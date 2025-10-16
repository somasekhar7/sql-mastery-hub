import { 
  Database, 
  Filter,
  BarChart3,
  Layers,
  Link,
  Type,
  GitMerge,
  Search,
  FileCode,
  Calendar,
  Database as DatabaseIcon,
  TrendingUp,
  FolderTree,
  Zap,
  Table2,
  Lock,
  Settings,
  FileJson
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
  concepts: string
}

export const sqlTopics: SqlTopic[] = [
  // ========== FUNDAMENTALS ==========
  {
    id: "data-retrieval",
    title: "Data Retrieval Queries",
    description: "Master the fundamentals of retrieving data from databases using SELECT, FROM, and WHERE clauses.",
    problemCount: 3,
    difficulty: "Easy",
    estimatedTime: "15-20 min",
    icon: Database,
    completed: 0,
    category: "fundamentals",
    concepts: "SELECT, FROM, WHERE"
  },
  {
    id: "filtering-sorting",
    title: "Filtering and Sorting Data",
    description: "Learn to filter and organize query results using ORDER BY, DISTINCT, LIMIT, BETWEEN, and IN operators.",
    problemCount: 5,
    difficulty: "Easy",
    estimatedTime: "30-40 min",
    icon: Filter,
    completed: 0,
    category: "fundamentals",
    concepts: "ORDER BY, DISTINCT, LIMIT, BETWEEN, IN"
  },
  {
    id: "aggregation-functions",
    title: "Aggregation and Summary Functions",
    description: "Calculate totals, averages, and statistics using COUNT, SUM, AVG, MIN, and MAX functions.",
    problemCount: 4,
    difficulty: "Easy",
    estimatedTime: "25-30 min",
    icon: BarChart3,
    completed: 0,
    category: "fundamentals",
    concepts: "COUNT, SUM, AVG, MIN, MAX"
  },
  {
    id: "grouping-aggregation",
    title: "Grouping and Conditional Aggregation",
    description: "Group data and apply filters to grouped results using GROUP BY and HAVING clauses.",
    problemCount: 3,
    difficulty: "Medium",
    estimatedTime: "35-40 min",
    icon: Layers,
    completed: 0,
    category: "fundamentals",
    concepts: "GROUP BY, HAVING"
  },
  {
    id: "intro-joins",
    title: "Introductory Table Joins",
    description: "Combine data from multiple tables using INNER JOIN, LEFT JOIN, and RIGHT JOIN.",
    problemCount: 3,
    difficulty: "Medium",
    estimatedTime: "45-50 min",
    icon: Link,
    completed: 0,
    category: "fundamentals",
    concepts: "INNER JOIN, LEFT JOIN, RIGHT JOIN"
  },
  {
    id: "aliasing-functions",
    title: "Column Aliasing and Core SQL Functions",
    description: "Use aliases and string functions like AS, CONCAT, LENGTH, UPPER, and LOWER for data manipulation.",
    problemCount: 3,
    difficulty: "Easy",
    estimatedTime: "20-25 min",
    icon: Type,
    completed: 0,
    category: "fundamentals",
    concepts: "AS, CONCAT, LENGTH, UPPER, LOWER"
  },

  // ========== INTERMEDIATE ==========
  {
    id: "advanced-joins",
    title: "Advanced Joins and Set Operations",
    description: "Master complex join types and set operations including FULL OUTER JOIN, UNION, INTERSECT, and EXCEPT.",
    problemCount: 4,
    difficulty: "Medium",
    estimatedTime: "1-1.5 hours",
    icon: GitMerge,
    completed: 0,
    category: "intermediate",
    concepts: "FULL OUTER JOIN, UNION, INTERSECT, EXCEPT"
  },
  {
    id: "subqueries-nested",
    title: "Subqueries and Nested Logic",
    description: "Write complex nested queries using IN, EXISTS, and correlated subqueries for advanced data retrieval.",
    problemCount: 3,
    difficulty: "Medium",
    estimatedTime: "1 hour",
    icon: Search,
    completed: 0,
    category: "intermediate",
    concepts: "IN, EXISTS, Correlated Subqueries"
  },
  {
    id: "conditional-expressions",
    title: "Conditional Expressions",
    description: "Implement conditional logic in queries using CASE, WHEN, THEN, and ELSE statements.",
    problemCount: 3,
    difficulty: "Medium",
    estimatedTime: "45-50 min",
    icon: FileCode,
    completed: 0,
    category: "intermediate",
    concepts: "CASE, WHEN, THEN, ELSE"
  },
  {
    id: "string-date-manipulation",
    title: "String and Date Manipulation",
    description: "Transform and format text and dates using SUBSTRING, REPLACE, DATE_FORMAT, and EXTRACT functions.",
    problemCount: 4,
    difficulty: "Easy",
    estimatedTime: "40-50 min",
    icon: Calendar,
    completed: 0,
    category: "intermediate",
    concepts: "SUBSTRING, REPLACE, DATE_FORMAT, EXTRACT"
  },
  {
    id: "data-manipulation",
    title: "Data Manipulation Statements",
    description: "Modify database records using INSERT, UPDATE, and DELETE statements effectively.",
    problemCount: 3,
    difficulty: "Medium",
    estimatedTime: "35-40 min",
    icon: DatabaseIcon,
    completed: 0,
    category: "intermediate",
    concepts: "INSERT, UPDATE, DELETE"
  },

  // ========== ADVANCED ==========
  {
    id: "analytical-window",
    title: "Analytical and Window Functions",
    description: "Perform advanced analytics using ROW_NUMBER, RANK, DENSE_RANK, and PARTITION BY for complex calculations.",
    problemCount: 3,
    difficulty: "Hard",
    estimatedTime: "1.5-2 hours",
    icon: TrendingUp,
    completed: 0,
    category: "advanced",
    concepts: "ROW_NUMBER, RANK, DENSE_RANK, PARTITION BY"
  },
  {
    id: "cte-expressions",
    title: "Common Table Expressions (CTEs)",
    description: "Build complex queries using WITH clause and recursive CTEs for hierarchical and temporary data sets.",
    problemCount: 2,
    difficulty: "Hard",
    estimatedTime: "1 hour",
    icon: FolderTree,
    completed: 0,
    category: "advanced",
    concepts: "WITH clause, Recursive CTEs"
  },
  {
    id: "query-optimization",
    title: "Query Optimization and Indexing",
    description: "Improve query performance with indexes, execution plans, and optimization techniques.",
    problemCount: 2,
    difficulty: "Medium",
    estimatedTime: "45 min",
    icon: Zap,
    completed: 0,
    category: "advanced",
    concepts: "Indexes, Query Optimization, Execution Plans"
  },
  {
    id: "normalization-design",
    title: "Database Normalization and Schema Design",
    description: "Design efficient database schemas using 1NF, 2NF, 3NF principles and entity relationships.",
    problemCount: 2,
    difficulty: "Hard",
    estimatedTime: "1.5 hours",
    icon: Table2,
    completed: 0,
    category: "advanced",
    concepts: "1NF, 2NF, 3NF, Entity Relationships"
  },
  {
    id: "transactions-concurrency",
    title: "Transactions and Concurrency Control",
    description: "Manage database transactions using COMMIT, ROLLBACK, SAVEPOINT, and understand ACID properties.",
    problemCount: 2,
    difficulty: "Hard",
    estimatedTime: "1 hour",
    icon: Lock,
    completed: 0,
    category: "advanced",
    concepts: "COMMIT, ROLLBACK, SAVEPOINT, ACID Properties"
  },
  {
    id: "stored-procedures-triggers",
    title: "Stored Procedures and Triggers",
    description: "Create reusable database logic with stored procedures, triggers, and automated database actions.",
    problemCount: 2,
    difficulty: "Hard",
    estimatedTime: "1.5 hours",
    icon: Settings,
    completed: 0,
    category: "advanced",
    concepts: "CREATE PROCEDURE, CREATE TRIGGER, EXECUTE"
  },
  {
    id: "json-advanced-types",
    title: "JSON and Advanced Data Types",
    description: "Work with JSON data types using JSON_EXTRACT, JSON_OBJECT, and ARRAY functions for modern data structures.",
    problemCount: 2,
    difficulty: "Hard",
    estimatedTime: "1 hour",
    icon: FileJson,
    completed: 0,
    category: "advanced",
    concepts: "JSON_EXTRACT, JSON_OBJECT, ARRAY Functions"
  }
];
