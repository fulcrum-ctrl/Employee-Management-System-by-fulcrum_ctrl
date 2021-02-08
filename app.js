function Employee(id, firstName, lastName, role_id,manager_id, title, salary, department){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role_id = role_id;
    this.manager_id = manager_id;
    this.title = title;
    this.salary = salary;
    this.department = department;
};
function Department(dept_id, dept_name){
    this.dept_id = dept_id;
    this.dept_name = dept_name;
};
function Role(roleId, title, salary, department_id){
    this.roleId = roleId;
    this.title = title;
    this.salary = salary;
    this.department_id = department_id;
};



exports.Employee = Employee;
exports.Department = Department;
exports.Role = Role;
