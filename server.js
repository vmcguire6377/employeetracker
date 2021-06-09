const mysql = require('mysql2');
//const inputCheck = require('./utils/inputCheck');
const inquirer = require('inquirer');


//const consoleTable = require("console.table");

//console.table(data, columns);
//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //username
        user: 'root',
        //sql password
        password: 'Drm71vmm77!',
        database: 'employees'
    },

    console.log("You are connected to the database."),
);
console.log(`WELCOME to EMPLOYEE DB! What would you like to do?`);
const promptOptions = {
    viewEmployees: " View Employees",
    viewRoles: "View Roles",
    viewDepartment: "View Department",
    addEmployees: "Add Employees",
    addRoles: "Add Roles",
    addDepartment: "Add Department",
    exit: "Exit"
};

function prompt() {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Please select your option',
        choices: [
            promptOptions.viewEmployees,
            promptOptions.viewRoles,
            promptOptions.viewDepartment,
            promptOptions.addEmployees,
            promptOptions.addRoles,
            promptOptions.addDepartment,
            //promptOptions.updateEmployees,
            promptOptions.exit
        ]
    })
        .then(results => {
            console.log('results', results);
            switch (results.action) {
                case promptOptions.viewEmployees:
                    viewEmployees();
                    break;
                case promptOptions.viewroles:
                    viewRoles();
                    break;
                case promptOptions.viewDepartment:
                    viewDepartment();
                    break;
                case promptOptions.addEmployees:
                    addEmployees();
                    break;
                case promptOptions.addRoles:
                    addRoles();
                    break;
                case promptOptions.addDepartment:
                    addDepartment();
                    break;
                //case promptOptions.updateEmployees:
                //updateEmployees();
                //break;
                //to exit
                case promptOptions.exit:
                    db.end();
                    break;
            }
        });
}
/*function viewEmployees() {
    const query = db.query(
        "SELECT * FROM employees ?",
        res,
        function (err, res) {
            if (err) throw err;
            console.log("Your employee has been added to EmployeeDB!\n");
          prompt();  
        }
    )
}*/

//gitbash cannot find console-table, so at this point i can't view any tables.
//add function for view roles
function viewRoles() {
    db.query("SELECT roles.*, department.name FROM roles LEFT JOIN department ON department.id = roles.department_id", function (err, res) {
        if (err) throw err;
        console.table(res);
        prompt();
    }
    )}
//addEmployee function
function addEmployees() {
    console.log("Add a new employee.\n");
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "first_name",
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "last_name"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role_id",
                choices: [1, 2, 3]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager_id",
                choices: [1, 2, 3]
            }

        ])

        .then(function (res) {
            db.query(
                "INSERT INTO employees SET ?",
                res,
                function (err, res) {
                    if (err) throw err;
                    console.log("Your employee has been added to EmployeeDB!\n");
                    prompt();
                }
            )

        }
        );
}


//function to add role
function addRoles() {
    console.log("Add a new role.\n");
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the role name?",
                name: "name",
            },
            {
                type: "input",
                message: "What is the salary amount?",
                name: "salary_amt",
            },
            {
                type: "input",
                message: "What is the department id?",
                name: "department_id",
            }
        ])
        .then(function (res) {
            console.log(res);
            db.query(
                `INSERT INTO roles(name, salary_amt, department_id)
                VALUES
                    (?, ?, ?)`,


                [
                    res.name, parseInt(res.salary_amt), res.department_id
                ],
                function (err) {

                    if (err) throw err;
                    console.log("Your new role has been added to EmployeeDB!\n");
                    return prompt();
                }
            )

        }
        )

}

//function to add department
function addDepartment() {
    console.log("Add a new department.\n");
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the department name?",
                name: "department_name",
            },
            {
                type: "input",
                message: "What is the department id?",
                name: "department_id",
            }
          
        ])
        .then(function (res) {
            db.query(
                "INSERT INTO department SET ?",
                res,
                function (err, res) {
                    if (err) throw err;
                    console.log("Your new department has been added to EmployeeDB!\n");
                    prompt();
                }
            )

        }
        )

}

/*function viewRoles(view) {
    const sql = 'SELECT * FROM ${view}';
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init ();
    })

}*/

prompt();