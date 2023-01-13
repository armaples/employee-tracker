INSERT INTO departments (department_name)
VALUES  ("Web Development"),
        ("UX/UI"),
        ("Human Resource"),
        ("Information Technology");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Full-Stack Web Developer", "95000", 1),
        ("UX Designer", "68000", 2),
        ("HR Manager", "48000", 3),
        ("Systems Administrator", "98000", 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Alyssa", "M.", 1, 1),
        ("Aaron", "T.", 4, 1),
        ("Gina", "T.", 3, 1);