INSERT INTO department (name) VALUES
  ('Management'),
  ('Sales'),
  ('Warehouse'),
  ('Human Resources'),
  ('Administration'),
  ('Accounting');

INSERT INTO role (title, salary, department_id) VALUES
  ('Regional Manager', 60000.00, 1),
  ('Assistant to the Regional Manager', 40000.00, 1),
  ('Sales Representative', 40000.00, 2),
  ('Packer', 30000.00, 3),
  ('HR Representative', 38000.00, 4),
  ('HR Manager', 51000.00, 4),
  ('Receptionist', 20000.00, 5),
  ('Accountant', 50000.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Michael', 'Scott', 1, NULL),
  ('Dwight', 'Schrute', 2, 1),
  ('Jim', 'Halpert', 3, 2),
  ('Pam', 'Beesley', 4, 1),
  ('Darryl', 'Philbin', 5, NULL),
  ('Phyllis', 'Vance', 6, 1),
  ('Stanley', 'Hudson', 7, 2),
  ('Oscar', 'Martinez', 8, 1),
  ('Angela', 'Martin', 9, 1),
  ('Kevin', 'Malone', 10, 1),
  ('Toby', 'Flenderson', 11, NULL);
