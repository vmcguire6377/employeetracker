INSERT INTO managers (
    first_name, last_name, manager_id)
    VALUES
    ('Tom', 'Petty', '1'),
    ('Jerry', 'Cantrell', '2'),
    ('Sug', 'Knight', '3');

INSERT INTO department (
    department_name)
    VALUES
    ('Sales'),
    ('Marketing'),
    ('Finance');

INSERT INTO roles (
    name, salary_amt, department_id)
    VALUES
    ('Lead Salesman', '60000', 1),
    ('Marketing Coordinator', '70000', 2),
    ('Accountant', '80000', 3);

INSERT INTO employees (
    first_name, last_name, role_id, manager_id)
    VALUES
    ('Chris', 'Cornell','1','1'),
    ('Lane', 'Staley', '2', '2'),
    ('Harry', 'Styles','3','3');
