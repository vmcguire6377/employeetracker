const mysql = require('mysql2');
//const inputCheck = require('./utils/inputCheck');
const inquirer = require('inquirer');

//require("console.table");

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
    viewEmployee: " View Employee",
    viewRoles: "View Roles",
    viewDepartment: "View Department",
    addEmployee: "Add Employee",
    addRoles: "Add Roles",
    addDepartment: "Add Department",
    exit: "Exit"
};

function prompt() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Please select your option',
        choices: [
            promptOptions.viewEmployee,
            promptOptions.viewRoles,
            promptOptions.viewDepartment,
            promptOptions.addEmployee,
            promptOptions.addRoles,
            promptOptions.addDepartment,
            //promptOptions.updateEmployees,
            promptOptions.exit
        ]
    }])
        .then(results => {
            console.log('results', results);
            switch (results.action) {
                case promptOptions.viewEmployee:
                    viewEmployee();
                    break;
                case promptOptions.viewroles:
                    viewRoles();
                    break;
                case promptOptions.viewDepartment:
                    viewDepartment();
                    break;
                case promptOptions.addEmployee:
                    addEmployee();
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
function viewEmployee() {
    db.query(
        "SELECT * FROM employee ",
        
        function (err, res) {
            if (err) throw err;
            console.table(res);
          prompt();  
        }
    )
}


//add function for view roles
function viewRoles() {
    db.query(
        "SELECT * FROM roles",
     function (err, res) {
        if (err) throw err;
        console.table(res);
        prompt();
      }
    )
}

//add function for view department
function viewDepartment() {
    db.query(
        "SELECT * FROM department",
     function (err, res) {
        if (err) throw err;
        console.table(res);
        prompt();
      }
    )
}
//addEmployee function
function addEmployee() {
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
                choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
                "INSERT INTO employee SET ?",
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
            },


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