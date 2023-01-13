SELECT
*
FROM employees
INNER JOIN roles ON roles.id = employees.role_id
INNER JOIN departments ON roles.department_id = departments.id;