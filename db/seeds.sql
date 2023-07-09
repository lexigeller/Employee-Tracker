INSERT INTO department (name) VALUES
  ('Management'),
  ('Sales'),
  ('Warehouse'),
  ('Human Resources');
  ('Administration');
  ('Accounting');

INSERT INTO role (title, salary, department_id) VALUES
  ('Regional Manager', 60000.00, 1),
  ('Assistant to the Regional Manager', 40000.00, 1),
  ('Sales Representative', 40000.00, 2),
  ('Packer', 3000.00, 3),
  ('HR Representative', 38000.00, 4),
  ('HR Manager', 51000.00, 4),
  ('Receptionist', 20000.00, 5),
  ('Accountant', 50000.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Michael', 'Scott', 1, NULL),
  ('Dwight', 'Schrute', 2, 1),
  ('Jim', 'Halpert', 3, 1),
  ('Pam', 'Beesley', 4, 3),
  ('Darryl', 'Philbin', 5, NULL),
  ('Phyllis', 'Vance', 6, 5),
  ('Stanley', 'Hudson', 7, 5),
  ('Oscar', 'Martinez', 8, 7),
  ('Angela', 'Martin', 9, 7),
  ('Kevin', 'Malone', 10, 7),
  ('Toby', 'Flenderson', 11, NULL);
