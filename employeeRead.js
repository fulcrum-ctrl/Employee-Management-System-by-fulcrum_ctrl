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
    console.log(` 
    /$$      /$$ /$$$$$$$$ /$$        /$$$$$$   /$$$$$$  /$$      /$$ /$$$$$$$$
    | $$  /$ | $$| $$_____/| $$       /$$__  $$ /$$__  $$| $$$    /$$$| $$_____/
    | $$ /$$$| $$| $$      | $$      | $$  \__/| $$  \ $$| $$$$  /$$$$| $$      
    | $$/$$ $$ $$| $$$$$   | $$      | $$      | $$  | $$| $$ $$/$$ $$| $$$$$   
    | $$$$_  $$$$| $$__/   | $$      | $$      | $$  | $$| $$  $$$| $$| $$__/   
    | $$$/ \  $$$| $$      | $$      | $$    $$| $$  | $$| $$\  $ | $$| $$      
    | $$/   \  $$| $$$$$$$$| $$$$$$$$|  $$$$$$/|  $$$$$$/| $$ \/  | $$| $$$$$$$$
    |__/     \__/|________/|________/ \______/  \______/ |__/     |__/|________/
    `);
    console.log(`Connected as id ${connection.threadId}`);
    initialize();
});
var superArray = [];
// prints all employees
// creates constructor function and empty array
// constructor elements are pushed into array
// console table uses this for sorting
// same premise for succeeding functions
// each array element is seen as one row in db
// create global version of employee array for referencing later


//functional
const queryAllEmployees = () =>{
    let theQuery = 'SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.roleId LEFT JOIN department ON role.department_id=department.dept_id';
    let callBack = (err,res) => {
        if (err) throw err;
        res.forEach(itemDirections);
        console.table(employeeArray);
        console.log("Finished printing!");
        console.log(`-----------------------------------------`); 
        initialize();
    };
    let employeeArray = [];
    let itemDirections = ({id, first_name, last_name, role_id, manager_id, title, salary, dept_name}) =>{
        const placeHolder = new app.Employee(`${id}`, `${first_name}`, `${last_name}`, `${role_id}`,  `${manager_id}`, `${title}`, `${salary}`, `${dept_name}`);
        employeeArray.push(placeHolder);
    };  
    globalArray = employeeArray;
    connection.query(theQuery, callBack);
};
//functional
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
    let itemDirections = ({dept_id, dept_name}) =>{
        const placeHolder = new app.Department(`${dept_id}`, `${dept_name}`);
        departmentArray.push(placeHolder);
    };    
    connection.query(theQuery, callBack);      
};
//functional
const queryAllRoles = () =>{
    let theQuery = 'SELECT * FROM role';
    let roleArray = [];
   
    let itemDirections = ({roleId, title, salary, department_id,}) =>{
        const placeHolder = new app.Role(`${roleId}`, `${title}`, `${salary}`, `${department_id}`);
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
// functional
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
                'Search for employee record',
                'Add Department',
                'Add an employee',
                'Add Role',
                'View all employees by department',
                'View all employees by manager',
                'Update employee record',
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

                case 'View all employees by department':
                    console.log("Fetching all available departments...");
                    employeeByDept();
                    break;

                case 'Add an employee':
                    console.log("Fetching current employee log...");
                    addEmployee();
                    // initialize();
                    break;

                case 'Add Department':
                    addDept();    
                    break;
                
                case 'Add Role':
                    addRole();
                    break;

                case 'Update employee record':
                    console.log("Employee array at start: ", superArray); //empty
                    internalUpdate(); // should populate
                    console.log("Employee array after internal update: ", superArray); // should contain elementsddd
                    updateEmployee();
                    break;

                case 'Search for employee record':
                    console.log("Fetching specific employee record...");
                    searchEmployee();
                    break;

                case 'exit':
                    console.log("Goodbye!");
                    connection.end;
                    break;
            }
        });
};
// add validate + role id/manager id later

// functional
const employeeByDept = () => {
    inquirer
        .prompt(
            {
                name: 'deptPick',
                type: 'list',
                message: 'Pick the department you would like to view: ',
                choices: [
                    'Research and Development',
                    'Human Resources',
                    'Legal',
                    'Administrative',
                    'Manpower',
                    'Return',
                ],
            })
        .then((answer)=>{
            let employeeArray = [];
                    let itemDirections = ({id, first_name, last_name, role_id, manager_id, title, salary, dept_name}) =>{
                    const placeHolder = new app.Employee(`${id}`, `${first_name}`, `${last_name}`, `${role_id}`,  `${manager_id}`, `${title}`, `${salary}`, `${dept_name}`);
                    employeeArray.push(placeHolder);
                    };
                    function callBack(err, res) {
                        if (err)
                            throw err;
                        res.forEach(itemDirections);
                        console.table(employeeArray);
                        console.log("Finished printing!");
                        console.log(`-----------------------------------------`);
                        initialize();
                    };
            switch(answer.deptPick){
                case 'Research and Development':
                    console.log("Fetching all employees under this department...");
                    let theQuery = `SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.roleId LEFT JOIN department ON role.department_id=department.dept_id WHERE role_id=1`;
                    connection.query(theQuery,callBack);
                    break;
                case 'Human Resources':
                    console.log("Fetching all employees under this department...");
                    let theQuery2 = `SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.roleId LEFT JOIN department ON role.department_id=department.dept_id WHERE role_id=2`;
                    connection.query(theQuery2,callBack);
                    break;
                case 'Legal':
                    console.log("Fetching all employees under this department...");
                    let theQuery3 = `SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.roleId LEFT JOIN department ON role.department_id=department.dept_id WHERE role_id=3`;
                    connection.query(theQuery3,callBack);
                    break; 
                case 'Administrative':
                    console.log("Fetching all employees under this department...");
                    let theQuery4 = `SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.roleId LEFT JOIN department ON role.department_id=department.dept_id WHERE role_id=4`;
                    connection.query(theQuery4,callBack);
                    break;    
                case 'Manpower':
                    console.log("Fetching all employees under this department...");
                    let theQuery5 = `SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.roleId LEFT JOIN department ON role.department_id=department.dept_id WHERE role_id=5`;
                    connection.query(theQuery5,callBack);
                    break;
                case 'Return':
                    console.log("<---");
                    break;               
            }
        })    
};
// functional
const searchEmployee = () => {
    let callBack = (err,res) => {
        if (err) throw err;
        res.forEach(itemDirections);
        console.table(employeeArray);
        console.log("Finished printing!");
        console.log(`-----------------------------------------`);
        initialize(); 
    };
    let employeeArray = [];
    let itemDirections = ({id, first_name, last_name, role_id, manager_id, title, salary, dept_name}) =>{
        const placeHolder = new app.Employee(`${id}`, `${first_name}`, `${last_name}`, `${role_id}`,  `${manager_id}`, `${title}`, `${salary}`, `${dept_name}`);
        employeeArray.push(placeHolder);
    };  
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
        ])
        .then((answer)=>{
            connection.query(
                'SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.roleId LEFT JOIN department ON role.department_id=department.dept_id WHERE ?',
                [{
                    first_name: answer.first_name,
                    
                },
                {
                    last_name: answer.last_name,
                }
                ],
                callBack
            );
        })
};
// wip
const internalUpdate = async () => {
    
    let theQuery = 'SELECT * FROM employee';
    let itemDirections = ({first_name, last_name}) => {
        const placeHolder = `${first_name} ${last_name}`;
        superArray.push(placeHolder);

    };
    let callBack = (err,res) => {
        if (err) throw err;
        res.forEach(itemDirections);
        
};
connection.query(theQuery, callBack);    
};
// wip
const updateEmployee = () => {
console.log("Fetching list of available employees...");
inquirer
    .prompt([{
        name: "pickEmployee",
        type: "list",
        message: "Pick an employee you would like to update: ",
        choices: superArray,
    },{
        name: "newRole",
        type: "list",
        message: "Pick a new role for employee: ",
        choices: [
            "Manager",
            "Researcher",
            "Legal Liaison",
            "HR Person",
            "Grunt",
        ]
    }])
    .then((answer)=>{
        console.log("You are updating: ", answer.pickEmployee);
        console.log("New role: ", answer.newRole);
    })

};
// wip
const removeEmployee = () => {

};
// functional
const addDept = () => {
    inquirer
        .prompt({
            name: "newDept",
            type: "input",
            message: "Enter new department name: ",
         })
        .then((answer) => {
            connection.query(`INSERT INTO department SET ?`,
                {dept_name: answer.newDept},
                
                (err) => {
                    if (err) throw err;
                    console.log("New slave department added!");
                    initialize();
                }
            );
        });
};
const addEmployee = () => {
    inquirer
        .prompt([{
            name: "first_name",
            type: "input",
            message: "Enter first name of new employee: ",
        },{
            name: "last_name",
            type: "input",
            message: "Enter last name of new employee: ",
        },{
            name: "role_id",
            type: "list",
            message: "Pick role for new employee: ",
            choices: [
                "Manager",
                "Researcher",
                "Legal Liaison",
                "HR Person",
                "Grunt",
            ]
        }
    
    ])
        .then((answer)=>{
            
            switch (answer.role_id) {
                case "Manager":
                    connection.query(
                        'INSERT INTO employee SET ?',
                        {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: 1,
                        },
                        (err) => {
                            if (err) throw err;
                            console.log("New slave added!");
                            initialize();
                        }
                    );
                    break;
                
                case "Researcher":
                    connection.query(
                        'INSERT INTO employee SET ?',
                        {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: 2,
                        },
                        (err) => {
                            if (err) throw err;
                            console.log("New slave added!");
                            initialize();
                        }
                    );
                    break;
    
                case "Legal Liaison":
                    connection.query(
                        'INSERT INTO employee SET ?',
                        {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: 3,
                        },
                        (err) => {
                            if (err) throw err;
                            console.log("New slave added!");
                            initialize();
                        }
                    );
                    break;
                
                case "HR Person":
                    connection.query(
                        'INSERT INTO employee SET ?',
                        {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: 4,
                        },
                        (err) => {
                            if (err) throw err;
                            console.log("New slave added!");
                            initialize();
                        }
                    );
                    break;
    
                case "Grunt":
                    connection.query(
                        'INSERT INTO employee SET ?',
                        {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: 5,
                        },
                        (err) => {
                            if (err) throw err;
                            console.log("New slave added!");
                            initialize();
                        }
                    );
                    break;
            };
        });
};

const addRole = () => {
    //title
    //salary
    // will require validate 
    //wc dept (dept_id)
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: "Enter title of new role: ",
        },{
            name:"salary",
            type: "number",
            message: "Enter a figure for this role's salary: ",
            validate: async (salary) => {
                if (typeof salary !== 'number') {
                    return 'Input has to be a number';
                }
                return true;
            }
        },{
            name: "department",
            type: "list",
            message: "Pick department for this role: ",
            choices: [
                "Research and Development",
                "Human Resources",
                "Legal",
                "Administrative",
                "Manpower",
            ]
        }
    ])
    .then((answer)=>{
        switch (answer.department) {
            case "Research and Development":
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: 1,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log("New slave role added!");
                        initialize();
                    });
                    break;

            case "Human Resources":
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: 2,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log("New slave role added!");
                        initialize();
                    });
                    break;
            
            case "Legal":
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: 3,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log("New slave role added!");
                        initialize();
                    });
                    break;

            case "Administrative":
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: 4,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log("New slave role added!");
                        initialize();
                    });
                    break;

            case "Manpower":
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: 5,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log("New slave role added!");
                        initialize();
                    });
                    break;
        };
    });
    };

