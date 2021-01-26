DROP DATABASE IF EXISTS employee_managementDB;

CREATE DATABASE employee_managementDB;

USE employee_managementDB;

CREATE TABLE department(
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE department(
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- populate with ten employees to get ball rolling
-- role_id and manager_id??
-- FKs, link them to role table and dept table
-- manager_id can be null
-- RnD: 1, HR: 2, Legal: 3, Admin: 4
INSERT INTO department (name) VALUES ("Research and Development"),("Human Resources"),("Legal"),("Administrative"),("Manpower");


INSERT INTO role (title,salary,department_id) 
VALUES 
("Manager",2000.00,4),
("Researcher",2000.00,1),
("Legal Liaison",2000.00,3),
("Grunt", 1800.00,5),
("HR Person",2000.00,2); 

INSERT INTO employee(first_name,last_name,role_id) VALUES 
("Ronald","Angeles",2),
("Luigi","Salvacion",1),
("Carlo","Dalino",3),
("Rhetly","Costa",5),
("Josef","Solangon",1),
("Shawn","Rosete",2),
("Charles","Ato",3),
("Judah","Dela Cruz",5);

INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES 
("Jared","Lee",4,2),
("Gian","Autos",4,5);
-- managers are those with role_id 1
-- grunts are those with role_id 4
-- grunts have managers
-- capitalism kills