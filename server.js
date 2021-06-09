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

    const promptOptions = {
        viewEmployees: " View Employees",
        viewRoles: "View Roles",
        viewDepartments: "View Departments",
        addEmployees: "Add Employees",
        addRoles: "Add Roles",
        addDepartments: "Add Departments",
        exit: "Exit"
    };
    
        function prompt () {
            inquirer.prompt ( {
                type: 'list',
                name: 'action',
                message: 'Please select your option',
                choices: [
                    //promptOptions.viewEmployees,
                    //promptOptions.viewRoles,
                    //promptOptions.viewDepartments,
                    promptOptions.addEmployees,
                    promptOptions.addRoles,
                    promptOptions.addDepartments,
                    //promptOptions.updateEmployees,
                    promptOptions.exit
                ]
            })
        .then(results => {
            console.log('results', results);
            switch (results.action) {
                /*case promptOptions.viewEmployees:
                    viewEmployees();
                    break;
                case promptOptions.viewroles:
                    viewRoles();
                    break;
                case promptOptions.viewDepartments:
                    viewDepartments();
                    break;*/
                case promptOptions.addEmployees:
                    addEmployees();
                    break;
                case promptOptions.addRoles:
                    addRoles();
                    break;
                case promptOptions.addDepartments:
                    addDepartments();
                    break;
                //case promptOptions.updateEmployees:
                   // updateEmployees();
                    //break;
                    //to exit
                    case promptOptions.exit:
                        db.end();
                        break; 
            }
        });
    
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
            const query = db.query(
                "INSERT INTO employees SET ?",
                res,
                function (err, res) {
                    if (err) throw err;
                    console.log("Your employee has been added to EmployeeDB!\n");
                  prompt();  
                }
            )
        
//function to add role
function addRoles () {
        return inquirer
        .prompt([
            {
                type: "list",
                message: "What is the role name?",
                name: "role_id",
                choices: [1, 2, 3]
            }
            .then(function (res) {
                const query = db.query(
                    "INSERT INTO roles SET ?",
                    res,
                    function (err, res) {
                        if (err) throw err;
                        console.log("Your role has been added to EmployeeDB!\n");
                    
                    }
                    
                );
                prompt();
            })
    
    
      
    
    
/*function viewTable(view) {
    const sql = 'SELECT * FROM ${view}';
    db.quer(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init ();
    })*/
     
        ])}})}}
        prompt();