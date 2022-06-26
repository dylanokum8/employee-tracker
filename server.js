const mysql = require('mysql');
const inquirer = require("inquirer");
const { createConnection } = require('net');

// Creates connection

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "password",
    database: "employee_tracker"
});

createConnection.connect(function(err) {
    if (err) throw err;
    promptUser();
})


// Prompt at main menu
const promptUser = () => {
    inquirer.prompt ([
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