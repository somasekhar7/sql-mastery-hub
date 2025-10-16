export interface TestCase {
  description: string;
  expected: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  concept: string;
  estimatedTime: string;
  description: string;
  hints: string[];
  initialCode: string;
  solution: string;
  testCases: TestCase[];
}

export const problemsData: Problem[] = [
  // CRUD Operations - Easy
  {
    id: "crud-select-1",
    title: "Select All Employees",
    difficulty: "Easy",
    concept: "CRUD Operations",
    estimatedTime: "5 min",
    description: `Write a SQL query to retrieve all columns from the employees table.

**Table Schema:**
\`\`\`sql
employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(50),
  salary DECIMAL(10,2)
)
\`\`\``,
    hints: ["Use SELECT * to select all columns", "Don't forget the FROM clause"],
    initialCode: "-- Write your SQL query here\nSELECT ",
    solution: "SELECT * FROM employees;",
    testCases: [
      { description: "Returns all employees", expected: "All rows from employees table" }
    ]
  },
  {
    id: "crud-insert-1",
    title: "Insert New Employee",
    difficulty: "Easy",
    concept: "CRUD Operations",
    estimatedTime: "8 min",
    description: `Write a SQL query to insert a new employee with id=5, name='Alice Brown', department='Sales', salary=55000.`,
    hints: ["Use INSERT INTO statement", "Specify column names and values"],
    initialCode: "-- Write your SQL query here\nINSERT INTO ",
    solution: "INSERT INTO employees (id, name, department, salary) VALUES (5, 'Alice Brown', 'Sales', 55000);",
    testCases: [
      { description: "Employee successfully inserted", expected: "1 row affected" }
    ]
  },

  // CRUD Operations - Medium
  {
    id: "crud-update-1",
    title: "Update Employee Salary",
    difficulty: "Medium",
    concept: "CRUD Operations",
    estimatedTime: "10 min",
    description: `Write a SQL query to increase the salary by 10% for all employees in the Engineering department.`,
    hints: ["Use UPDATE statement", "Apply WHERE clause for department", "Use salary * 1.1 for 10% increase"],
    initialCode: "-- Write your SQL query here\nUPDATE ",
    solution: "UPDATE employees SET salary = salary * 1.1 WHERE department = 'Engineering';",
    testCases: [
      { description: "Engineering salaries updated", expected: "Multiple rows affected" }
    ]
  },

  // Basic Queries - Easy
  {
    id: "basic-where-1",
    title: "Filter High Earners",
    difficulty: "Easy",
    concept: "Basic Queries",
    estimatedTime: "7 min",
    description: `Select all employees with salary greater than 60000, ordered by salary descending.`,
    hints: ["Use WHERE for filtering", "Use ORDER BY for sorting"],
    initialCode: "-- Write your SQL query here\nSELECT ",
    solution: "SELECT * FROM employees WHERE salary > 60000 ORDER BY salary DESC;",
    testCases: [
      { description: "Returns high earners sorted", expected: "Employees with salary > 60000, descending" }
    ]
  },
  {
    id: "basic-limit-1",
    title: "Top 3 Employees",
    difficulty: "Easy",
    concept: "Basic Queries",
    estimatedTime: "6 min",
    description: `Write a query to get the top 3 highest paid employees.`,
    hints: ["Order by salary DESC", "Use LIMIT 3"],
    initialCode: "-- Write your SQL query here\nSELECT ",
    solution: "SELECT * FROM employees ORDER BY salary DESC LIMIT 3;",
    testCases: [
      { description: "Returns top 3", expected: "3 rows with highest salaries" }
    ]
  },

  // Basic Queries - Medium
  {
    id: "basic-like-1",
    title: "Pattern Matching Names",
    difficulty: "Medium",
    concept: "Basic Queries",
    estimatedTime: "12 min",
    description: `Find all employees whose name starts with 'J' and work in Engineering department.`,
    hints: ["Use LIKE with % wildcard", "Combine conditions with AND"],
    initialCode: "-- Write your SQL query here\nSELECT ",
    solution: "SELECT * FROM employees WHERE name LIKE 'J%' AND department = 'Engineering';",
    testCases: [
      { description: "Names starting with J in Engineering", expected: "Matching employees only" }
    ]
  },

  // Joins - Easy
  {
    id: "joins-inner-1",
    title: "Employee Department Join",
    difficulty: "Easy",
    concept: "Joins & Relationships",
    estimatedTime: "15 min",
    description: `Join employees and departments tables to show employee name and department name.

**Tables:**
\`\`\`sql
employees (id, name, dept_id)
departments (id, dept_name)
\`\`\``,
    hints: ["Use INNER JOIN", "Join on employees.dept_id = departments.id"],
    initialCode: "-- Write your SQL query here\nSELECT ",
    solution: "SELECT e.name, d.dept_name FROM employees e INNER JOIN departments d ON e.dept_id = d.id;",
    testCases: [
      { description: "Shows matched employees and departments", expected: "Employee names with department names" }
    ]
  },

  // Joins - Medium
  {
    id: "joins-left-1",
    title: "All Employees with Optional Department",
    difficulty: "Medium",
    concept: "Joins & Relationships",
    estimatedTime: "18 min",
    description: `Use LEFT JOIN to show all employees even if they don't have a department assigned.`,
    hints: ["LEFT JOIN keeps all rows from left table", "Some dept_name values may be NULL"],
    initialCode: "-- Write your SQL query here\nSELECT ",
    solution: "SELECT e.name, d.dept_name FROM employees e LEFT JOIN departments d ON e.dept_id = d.id;",
    testCases: [
      { description: "All employees shown", expected: "Includes employees without departments" }
    ]
  },

  // Joins - Hard
  {
    id: "joins-self-1",
    title: "Employee Manager Self Join",
    difficulty: "Hard",
    concept: "Joins & Relationships",
    estimatedTime: "25 min",
    description: `Find all employees and their managers' names using a self join on the employees table.

**Table:**
\`\`\`sql
employees (id, name, manager_id)
\`\`\``,
    hints: ["Join employees to itself", "Use aliases for clarity", "e.manager_id = m.id"],
    initialCode: "-- Write your SQL query here\nSELECT ",
    solution: "SELECT e.name AS employee, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;",
    testCases: [
      { description: "Shows employee-manager pairs", expected: "Employee names with their manager names" }
    ]
  },

  // Aggregate Functions - Easy
  {
    id: "agg-count-1",
    title: "Count Employees",
    difficulty: "Easy",
    concept: "Aggregate Functions",
    estimatedTime: "5 min",
    description: `Count the total number of employees in the company.`,
    hints: ["Use COUNT(*) or COUNT(id)", "No GROUP BY needed for single count"],
    initialCode: "-- Write your SQL query here\nSELECT ",
    solution: "SELECT COUNT(*) AS total_employees FROM employees;",
    testCases: [
      { description: "Returns count", expected: "Single row with total count" }
    ]
  },

  // Aggregate Functions - Medium
  {
    id: "agg-group-1",
    title: "Average Salary by Department",
    difficulty: "Medium",
    concept: "Aggregate Functions",
    estimatedTime: "15 min",
    description: `Calculate the average salary for each department.`,
    hints: ["Use AVG() function", "GROUP BY department", "Consider rounding"],
    initialCode: "-- Write your SQL query here\nSELECT ",
    solution: "SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department;",
    testCases: [
      { description: "Average per department", expected: "Each department with its average salary" }
    ]
  },

  // Aggregate Functions - Hard
  {
    id: "agg-having-1",
    title: "Departments with High Average",
    difficulty: "Hard",
    concept: "Aggregate Functions",
    estimatedTime: "20 min",
    description: `Find departments where the average salary is greater than 65000.`,
    hints: ["Use GROUP BY department", "Use HAVING for filtering groups", "HAVING comes after GROUP BY"],
    initialCode: "-- Write your SQL query here\nSELECT ",
    solution: "SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department HAVING AVG(salary) > 65000;",
    testCases: [
      { description: "High-paying departments", expected: "Only departments with avg > 65000" }
    ]
  },

  // Subqueries - Medium
  {
    id: "sub-where-1",
    title: "Above Average Salary",
    difficulty: "Medium",
    concept: "Subqueries & CTEs",
    estimatedTime: "18 min",
    description: `Find all employees who earn more than the company average salary.`,
    hints: ["Use subquery in WHERE clause", "Subquery: SELECT AVG(salary) FROM employees"],
    initialCode: "-- Write your SQL query here\nSELECT ",
    solution: "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
    testCases: [
      { description: "Above average earners", expected: "Employees with above-average salary" }
    ]
  },

  // Subqueries - Hard
  {
    id: "sub-cte-1",
    title: "Department Salary Rankings with CTE",
    difficulty: "Hard",
    concept: "Subqueries & CTEs",
    estimatedTime: "30 min",
    description: `Use a CTE to calculate department totals, then find departments in top 3.`,
    hints: ["WITH clause creates CTE", "Calculate SUM in CTE", "Order and limit in main query"],
    initialCode: "-- Write your SQL query here\nWITH ",
    solution: "WITH dept_totals AS (SELECT department, SUM(salary) AS total FROM employees GROUP BY department) SELECT * FROM dept_totals ORDER BY total DESC LIMIT 3;",
    testCases: [
      { description: "Top 3 departments by total salary", expected: "3 departments with highest total salaries" }
    ]
  },

  // Window Functions - Hard
  {
    id: "window-row-1",
    title: "Rank Employees by Salary",
    difficulty: "Hard",
    concept: "Window Functions",
    estimatedTime: "25 min",
    description: `Use ROW_NUMBER() to rank employees within each department by salary.`,
    hints: ["Use ROW_NUMBER() OVER", "PARTITION BY department", "ORDER BY salary DESC"],
    initialCode: "-- Write your SQL query here\nSELECT ",
    solution: "SELECT name, department, salary, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank FROM employees;",
    testCases: [
      { description: "Employees ranked within departments", expected: "Each employee with rank number" }
    ]
  }
];

export const conceptOrder = [
  "CRUD Operations",
  "Basic Queries",
  "Joins & Relationships",
  "Aggregate Functions",
  "Subqueries & CTEs",
  "Window Functions",
  "Stored Procedures & Functions",
  "Transactions & Concurrency",
  "Performance & Optimization"
];
