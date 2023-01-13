const router = require('express').Router();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const menu = require('./menu');
const cTable = require('console.table');
require('dotenv').config();

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.PASSWORD,
        database: process.env.DB_NAME,
    },
    console.log(`Connected to employee database!`)
);

function viewDepartments() {
    db.query(
        'SELECT * FROM `departments`',
        function(err, results, res) {
            if (err) {
                res.status.json(err);
                return;
            }

            console.table('Departments', results);
        }
    );
}

function viewRoles() {
    db.query(
        'SELECT roles.title, roles.salary, departments.department_name FROM departments JOIN roles ON departments.id = roles.department_id',
        function(err, results, res) {
            if (err) {
                console.log(err);
                return;
            }

            console.table('Roles', results);
        }
    )
}

function viewEmployees() {
    db.query(
        'SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.department_name, employees.manager_id FROM employees INNER JOIN roles ON roles.id = employees.role_id INNER JOIN departments ON roles.department_id = departments.id',
        function(err, results, res) {
            if (err) {
                console.log(err);
                return;
            }

            console.table('Employees', results);
        }
    )
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the new department?',
                name: 'department_name'
            }
        ])
        .then((data) => {
            return data
        })
        .then((data, res) => {
            db.query(
                'INSERT INTO departments (department_name) VALUES (?)',
                [data.department_name],
                function(err, results, res) {
                    if (err) {
                        res.status.json(err);
                        return;
                    }

                    console.log('Department created!');
                }
            )
        })
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: `What is the title of the new role?`,
                name: 'title'
            },
            {
                type: 'input',
                message: `What is the salary of the new role?`,
                name: 'salary'
            },
            {
                type: 'input',
                message: `What is the department id of the new role?`,
                name: 'department_id'
            },
        ])
        .then((data) => {
            return data
        })
        .then((data, res) => {
            db.query(
                'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
                [data.title, data.salary, data.department_id],
                function(err, results, res) {
                    if (err) {
                        console.log(err)
                    }

                    console.log('Role created!');
                }
            )
        })
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: `What is the employee's first name?`,
                name: 'first_name'
            },
            {
                type: 'input',
                message: `What is the employee's last name?`,
                name: 'last_name'
            },
            {
                type: 'input',
                message: `What is the role id for the new employee?`,
                name: 'role_id'
            },
            {
                type: 'input',
                message: `What is the manager id for the new employee's manager?`,
                name: 'manager_id'
            },
        ])
        .then((data) => {
            return data
        })
        .then((data, res) => {
            db.query(
                'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                [data.first_name, data.last_name, data.role_id, data.manager_id],
                function(err, results, res) {
                    if (err) {
                        console.log(err)
                    }

                    console.log('Employee created!');
                }
            )
        })
}

function updateRole() {
    // need to add inquirer + query
}

module.exports = {router, viewDepartments, viewRoles, viewEmployees, addDepartment, addEmployee, addRole, updateRole};