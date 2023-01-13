const router = require('express').Router();
const inquirer = require("inquirer");
const queries = require('./queries');

const menuChoices = ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'];

function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: `Welcome to the employee database! Please choose an option below to continue.`,
                choices: menuChoices,
                name: 'selection',
            }
        ])
        .then((data) => {
            return data
        })
        .then((data, res) => {
            if (data.selection === menuChoices[0]) {
                queries.viewDepartments();
            } else if (data.selection === menuChoices[1]) {
                queries.viewRoles();
            } else if (data.selection === menuChoices[2]) {
                queries.viewEmployees();
            } else if (data.selection === menuChoices[3]) {
                queries.addDepartment();
            } else if (data.selection === menuChoices[4]) {
                queries.addRole();
            } else if (data.selection === menuChoices[5]) {
                queries.addEmployee();
            } else if (data.selection === menuChoices[6]) {
                queries.updateRole();
            } else {
                res.status(500).json('Something went wrong!')
            }
        })
}

module.exports = {router, init};