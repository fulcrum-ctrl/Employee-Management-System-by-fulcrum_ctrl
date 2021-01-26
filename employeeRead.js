const mysql = require('mysql');
const inquirer = require('inquirer');

//save connection config in variable for readability
const connectConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '299792458Sun.',
    database: 'employee_managementDB',
};
const connection = mysql.createConnection(connectConfig);

connection.connect((err)=>{
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    connection.end();
});

const queryAllEmployees = () =>{
    let theQuery = 'SELECT * FROM employee';
    let callBack = (err,res) => {
        if (err) throw err;
    }
    let itemDirections = ({id, first_name, last_name, role_id, manager_id}) =>{
        console.log(`${id} | ${first_name} | ${last_name} | ${role_id} | ${manager_id}`);
    };    
        res.forEach(itemDirections);
    connection.query(theQuery,cb);
    console.log(`------------------------------`);    
};

const queryAllDepartments = () =>{
    let theQuery = 'SELECT * FROM department';
    let callBack = (err,res) => {
        if (err) throw err;
    }
    let itemDirections = ({id, name}) =>{
        console.log(`${id} | ${name}`);
    };    
        res.forEach(itemDirections);
    connection.query(theQuery,cb);
    console.log(`------------------------------`);    
};

const queryAllRoles = () =>{
    let theQuery = 'SELECT * FROM role';
    let callBack = (err,res) => {
        if (err) throw err;
    }
    let itemDirections = ({id, title, salary, department_id,}) =>{
        console.log(`${id} | ${title} | ${salary} | ${department_id}`);
    };    
        res.forEach(itemDirections);
    connection.query(theQuery,cb);
    console.log(`------------------------------`);    
};