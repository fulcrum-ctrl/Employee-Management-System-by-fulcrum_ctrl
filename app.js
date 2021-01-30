function Employee(id, firstName, lastName, role_id,manager_id){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role_id = role_id;
    this.manager_id = manager_id;
};
function Department(id, name){
    this.id = id;
    this.name = name;
};
function Role(id, title, salary, department_id){
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.department_id = department_id;
};

exports.Employee = Employee;
exports.Department = Department;
exports.Role = Role;

