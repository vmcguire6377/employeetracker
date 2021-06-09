const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt 
};
return inquirer.prompt ([
    {
        type: 'checkbox',
        choice: 'What would you like to do?',
        Choices: ['view all departments', 'view all roles',
        'view all employees', 'add a department', 'add a role', 
    'add an employee', 'update an employee role']
    }
]);