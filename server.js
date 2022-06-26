const mysql = require('mysql');
const inquirer = require("inquirer");
const express = require('express');
const db = require('./db/connection');
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res) => {
    res.status(404).end();
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

// // Creates connection

// const db = mysql.createConnection({
//     host:"localhost",
//     user: "root",
//     password: "password",
//     database: "employee_tracker"
// });

// createConnection.connect(function(err) {
//     if (err) throw err;
//     promptUser();
// })


// Prompt at main menu
function promptUser() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Please choose from one of the following choices?',
            choices: ['View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update employee role']
        }
    ])
        // Main menu selections
        .then((answers) => {
            const { menu } = answers;

            if (menu === "View all departments") {
                viewDepartments();
            }
            if (menu === "View all roles") {
                viewRoles();
            }
            if (menu === "View all employees") {
                viewEmployees();
            }
            if (menu === "Add a department") {
                addDepartment();
            }
            if (menu === "Add a role") {
                addRole();
            }
            if (menu === "Add an employee") {
                addEmployee();
            }
            if (menu === "Update employee role") {
                updateRole();
            }
        });
};

// View all Departments

function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
        if (err) {
            results.status(400).json({ error: err.message })
            return;
        }

        console.table(result);
        promptUser();

    })

}

// View all roles

function viewRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, results) => {
        if (err) {
            results.status(400).json({ error: err.message })
            return;
        }

        console.table(result);
        promptUser();

    })

}

// view all employees

function viewEmployees() {
const sql = `SELECT employee.id, employee.first_name, employee.last_name,
role.title AS job_title,
department.department_name, role.salary,
CONCAT(manager.first_name, "  " ,manager.last_name) AS manager FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id
`;
db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    promptUser();
});
};

// add departments

function addDepartment() {
    inquirer.prompt([ {
        
        type: 'input',
        name: 'addDept',
        message: 'Enter a department that you would like to add',
        validate: addDept => {
            if (addDept) {
                return true;
            } else {
                console.log('Please enter a department to add');
                return false;
            }
        }
    }
    ])

    .then((answer) => {
        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        const params = [answer.department_name];
        db.query(sql, params, (err,result) => {
            if (err) throw err;
            console.log("department added succesfully");
db.query(`SELECT * FROM department`, (err, result) => {
    if (err) {
        res.status(400).json({ error: err.message })
        return;
    }
    console.table(result);
    promptUser();
        });
    });
});
};

function addRole() {
    inquirer.prompt([

        {
            type: 'input',
            name: 'addRole',
            message: 'Please enter the role that you wish to add',
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter a role to add');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'addSalary',
            message: 'Please enter the salary for the role that is being added to the database',
            validate: addSalary => {
                if (addSalary) {
                    return true;
                } else {
                    console.log('Please enter a salary for the role being added');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'addId',
            message: 'Please enter the department ID that applies to this new role',
            validate: addId => {
                if (addId) {
                    return true;
                } else {
                    console.log('Please enter the department ID that accurately reflects the new Role');
                    return false;
                }
            } 
        }
    ])

    .then((answer) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?)(?)(?)`;
        const params = [answer.title, response.salary, response.department_id];
        db.query(sql, params, (err,result) => {
            if (err) throw err;
            console.log("Role added succesfully");

db.query(`SELECT * FROM role`, (err, result) => {
    if (err) {
        res.status(400).json({ error: err.message })
        return;
    }
    console.table(result);
    promptUser();
        });
    });
});

};

