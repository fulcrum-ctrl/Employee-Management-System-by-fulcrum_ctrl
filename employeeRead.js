const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
    console.log("Welcome punyeta");
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
    function Employee(id, firstName, lastName, role_id,manager_id){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role_id = role_id;
        this.manager_id = manager_id;
    };
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
        const placeHolder = new Employee(`${id}`, `${first_name}`, `${last_name}`, `${role_id}`,  `${manager_id}`);
        employeeArray.push(placeHolder);
    };  
    connection.query(theQuery, callBack);
};

const queryAllDepartments = () =>{
    let theQuery = 'SELECT * FROM department';
    function Department(id, name){
        this.id = id;
        this.name = name;
    };
    let callBack = (err,res) => {
        if (err) throw err;
        res.forEach(itemDirections);
        console.table(departmentArray);
        console.log(`-----------------------------------------`);
        initialize(); 
    };
    let departmentArray = [];
    let itemDirections = ({id, name}) =>{
        const placeHolder = new Department(`${id}`, `${name}`);
        departmentArray.push(placeHolder);
    };    
    connection.query(theQuery, callBack);      
};

const queryAllRoles = () =>{
    let theQuery = 'SELECT * FROM role';
    let roleArray = [];
    function Role(id, title, salary, department_id){
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    };
    let itemDirections = ({id, title, salary, department_id,}) =>{
        const placeHolder = new Role(`${id}`, `${title}`, `${salary}`, `${department_id}`);
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

                case 'exit':
                    console.log("Goodbye!");
                    connection.end;
                    break;
            }
        });
};