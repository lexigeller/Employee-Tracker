const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'your_mysql_password',
  database: 'employee_tracker_db',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');

  // Start the application
  start();
});

// Start the application
function start() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          break;
      }
    });
}

// Function to view all departments
function viewAllDepartments() {
  const query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('\nAll Departments:');
    console.table(res);
    start();
  });
}

// Function to view all roles
function viewAllRoles() {
  const query = 'SELECT * FROM role';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('\nAll Roles:');
    console.table(res);
    start();
  });
}

// Function to view all employees
function viewAllEmployees() {
  const query =
    'SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('\nAll Employees:');
    console.table(res);
    start();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:',
    })
    .then((answer) => {
      const query = 'INSERT INTO department (name) VALUES (?)';
      connection.query(query, [answer.name], (err, res) => {
        if (err) throw err;
        console.log('Department added successfully!');
        start();
      });
    });
}

// Function to add a role
function addRole() {
  const departmentQuery = 'SELECT * FROM department';
  connection.query(departmentQuery, (err, departments) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'Enter the title of the role:',
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Enter the salary of the role:',
        },
        {
          name: 'department',
          type: 'list',
          message: 'Select the department of the role:',
          choices: departments.map((department) => department.name),
        },
      ])
      .then((answers) => {
        const department = departments.find(
          (department) => department.name === answers.department
        );

        const query =
          'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        connection.query(
          query,
          [answers.title, answers.salary, department.id],
          (err, res) => {
            if (err) throw err;
            console.log('Role added successfully!');
            start();
          }
        );
      });
  });
}

// Function to add an employee
function addEmployee() {
  const roleQuery = 'SELECT * FROM role';
  connection.query(roleQuery, (err, roles) => {
    if (err) throw err;

    const managerQuery =
      'SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS manager FROM employee e';
    connection.query(managerQuery, (err, managers) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            name: 'first_name',
            type: 'input',
            message: "Enter the employee's first name:",
          },
          {
            name: 'last_name',
            type: 'input',
            message: "Enter the employee's last name:",
          },
          {
            name: 'role',
            type: 'list',
            message: "Select the employee's role:",
            choices: roles.map((role) => role.title),
          },
          {
            name: 'manager',
            type: 'list',
            message: "Select the employee's manager:",
            choices: managers.map((manager) => manager.manager),
          },
        ])
        .then((answers) => {
          const role = roles.find((role) => role.title === answers.role);
          const manager = managers.find(
            (manager) => manager.manager === answers.manager
          );

          const query =
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
          connection.query(
            query,
            [answers.first_name, answers.last_name, role.id, manager.id],
            (err, res) => {
              if (err) throw err;
              console.log('Employee added successfully!');
              start();
            }
          );
        });
    });
  });
}

// Function to update an employee role
function updateEmployeeRole() {
  const employeeQuery =
    'SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS employee FROM employee e';
  connection.query(employeeQuery, (err, employees) => {
    if (err) throw err;

    const roleQuery = 'SELECT * FROM role';
    connection.query(roleQuery, (err, roles) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            name: 'employee',
            type: 'list',
            message: 'Select the employee to update:',
            choices: employees.map((employee) => employee.employee),
          },
          {
            name: 'role',
            type: 'list',
            message: 'Select the new role:',
            choices: roles.map((role) => role.title),
          },
        ])
        .then((answers) => {
          const employee = employees.find(
            (employee) => employee.employee === answers.employee
          );
          const role = roles.find((role) => role.title === answers.role);

          const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
          connection.query(
            query,
            [role.id, employee.id],
            (err, res) => {
              if (err) throw err;
              console.log('Employee role updated successfully!');
              start();
            }
          );
        });
    });
  });
}

// Start the application
start();
