const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const app = require('./app.js');
//autorun schema.sql later
//save connection config in variable for readability
const connectConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '299792458Sun.',
    database: 'employee_managementDB',
};
//establishes actual connection to database
const connection = mysql.createConnection(connectConfig);

// main callback, initializes app
connection.connect((err)=>{
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    initialize();
});

// prints all employees
// creates constructor function and empty array
// constructor elements are pushed into array
// console table uses this for sorting
// same premise for succeeding functions
// each array element is seen as one row in db

const queryAllEmployees = () =>{
    let theQuery = 'SELECT * FROM employee';
    let callBack = (err,res) => {
        if (err) throw err;
        res.forEach(itemDirections);
        console.table(employeeArray);
        console.log("Finished printing!");
        console.log(`-----------------------------------------`); 
        initialize();
    };
    let employeeArray = [];
    let itemDirections = ({id, first_name, last_name, role_id, manager_id}) =>{
        const placeHolder = new app.Employee(`${id}`, `${first_name}`, `${last_name}`, `${role_id}`,  `${manager_id}`);
        employeeArray.push(placeHolder);
    };  
    connection.query(theQuery, callBack);
};

const queryAllDepartments = () =>{
    let theQuery = 'SELECT * FROM department';
    let callBack = (err,res) => {
        if (err) throw err;
        res.forEach(itemDirections);
        console.table(departmentArray);
        console.log(`-----------------------------------------`);
        initialize(); 
    };
    let departmentArray = [];
    let itemDirections = ({id, name}) =>{
        const placeHolder = new app.Department(`${id}`, `${name}`);
        departmentArray.push(placeHolder);
    };    
    connection.query(theQuery, callBack);      
};

const queryAllRoles = () =>{
    let theQuery = 'SELECT * FROM role';
    let roleArray = [];
   
    let itemDirections = ({id, title, salary, department_id,}) =>{
        const placeHolder = new app.Role(`${id}`, `${title}`, `${salary}`, `${department_id}`);
        roleArray.push(placeHolder);
    };  
    let callBack = (err,res) => {
        if (err) throw err;
        res.forEach(itemDirections);
        console.table(roleArray);
        console.log(`-----------------------------------------`);
        initialize(); 
    };
    connection.query(theQuery,callBack);    
};

const initialize = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: "Welcome, Administator. What would you like to do?",
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'View all employees by department',
                'View all employees by manager',
                'Add an employee',
                'exit',
            ],
        })
        .then((answer)=>{
            switch (answer.action) {
                case 'View all employees':
                    console.log("Printing all employees...");
                    queryAllEmployees();
                    break;
            
                case 'View all departments':
                    console.log("Printing all departments...");
                    queryAllDepartments();
                    break;

                case 'View all roles':
                    console.log("Printing all roles...");
                    queryAllRoles();
                    break;

                case 'Add an employee':
                    console.log("Fetching current employee log...");
                    addEmployee();
                    // initialize();
                    break;

                case 'exit':
                    console.log("Goodbye!");
                    connection.end;
                    break;
            }
        });
};

const addEmployee = () => {
    console.log("Printing all current employees...");
    // queryAllEmployees();
    inquirer    
        .prompt([
            {
            name: 'first_name',
            type: 'input',
            message: 'Input first name of employee: '
            },
            {
            name: 'last_name',
            type: 'input',
            message: 'Input last name of employee: '
            },
            {
            name: 'role_id',
            type: 'input',
            message: 'Input role ID of employee: '
            },
        ])
        .then((answer)=>{
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                },
                (err) => {
                    if (err) throw err;
                    console.log("New slave added!");
                    initialize();
                }
            );
        });

};

// add employee
// print ebriting
// add