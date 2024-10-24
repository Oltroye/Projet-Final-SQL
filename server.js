const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
const db = new sqlite3.Database(path.join(__dirname, 'entreprise.db'), (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    }
});

const sqlScript = fs.readFileSync(path.join(__dirname, 'table.sql'), 'utf8');
db.exec(sqlScript, (err) => {
    if (err) {
        console.error('Error executing SQL script:', err.message);
    }
});

app.use(express.static(path.join(__dirname, 'site')));

app.get('/employees', (req, res) => {
    res.sendFile(path.join(__dirname, 'site/employees.html'));
});
app.get('/formular', (req, res) => {
    res.sendFile(path.join(__dirname, 'site/formular.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'site/department.html'));
});
app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, 'site/product.html'));
});

app.get('/api/products', (req, res) => {
    const query = `SELECT ProductId, ProductName FROM products`;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

app.get('/api/employee', (req, res) => {
    const { companyId, departmentId, jobId } = req.query;

    let query = `
        SELECT 
            e.FirstName,
            e.LastName,
            j.JobName,
            e.BirthDate,
            e.HireDate,
            c.CompanyName,
            d.DepartementName,
            e.Country,
            e.City,
            e.Address,
            e.PhoneNumber,
            s.FirstName || ' ' || s.LastName AS SeniorFullName
        FROM employees e
        JOIN jobs j ON e.JobId = j.JobId
        JOIN companies c ON e.CompanyId = c.CompanyId
        JOIN departements d ON e.DepartementId = d.DepartementId
        LEFT JOIN employees s ON e.Senior = s.EmployeeId
    `;

    const params = [];
    const conditions = [];

    if (companyId) {
        conditions.push('e.CompanyId = ?');
        params.push(companyId);
    }

    if (departmentId) {
        conditions.push('e.DepartementId = ?');
        params.push(departmentId);
    }

    if (jobId) {
        conditions.push('e.JobId = ?');
        params.push(jobId);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

app.post('/add-link-product-employee', (req, res) => {
    const { productNamelink, employeeNamelink } = req.body;

    const query = `INSERT INTO employee_product (ProductId, EmpoyeeId) VALUES (?, ?)`;

    db.run(query, [productNamelink, employeeNamelink], function(err) {
        if (err) {
            console.error('Error linking product to employee:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/formular');
    });
});

app.get('/api/departments', (req, res) => {
    const { companyId, departmentId } = req.query;

    let query = `
        SELECT 
            d.DepartementName,
            c.CompanyName
        FROM departements d
        JOIN companies c ON d.CompanyId = c.CompanyId
    `;

    const params = [];
    const conditions = [];

    if (companyId) {
        conditions.push('d.CompanyId = ?');
        params.push(companyId);
    }

    if (departmentId) {
        conditions.push('d.DepartementId = ?');
        params.push(departmentId);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

app.get('/api/jobs', (req, res) => {
    const query = `SELECT JobId, JobName FROM jobs`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});
app.get('/api/companies', (req, res) => {
    const query = `SELECT CompanyId, CompanyName FROM companies`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

app.get('/api/departments', (req, res) => {
    const query = `SELECT DepartementId, DepartementName FROM departements`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

app.get('/api/seniors', (req, res) => {
    const query = `SELECT EmployeeId, FirstName, LastName FROM employees`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

app.get('/api/employee-products', (req, res) => {
    const { productName, fullName } = req.query;

    let query = `
        SELECT 
            e.FirstName || ' ' || e.LastName,
            p.ProductName
        FROM employees e
        JOIN employee_products ep ON e.EmployeeId = ep.EmployeeId
        JOIN products p ON ep.ProductId = p.ProductId
    `;

    const params = [];
    const conditions = [];

    if (productName) {
        conditions.push('p.ProductName = ?');
        params.push(productName);
    }

    if (fullName) {
        conditions.push('(e.FirstName || " " || e.LastName) LIKE ?');
        params.push(`%${fullName}%`);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

app.post('/add-employee', (req, res) => {
    const {
        firstName,
        lastName,
        jobId,
        birthDate,
        hireDate,
        companyId,
        departmentId,
        country,
        city,
        address,
        phoneNumber,
        senior = req.body.senior ? parseInt(req.body.senior, 10) : null,
        status
    } = req.body;

    if (!companyId) {
        return res.status(400).send('Entreprise non sélectionnée.');
    }

    const query = `INSERT INTO employees (FirstName, LastName, JobId, BirthDate, HireDate, CompanyId, DepartementId, Country, City, Address, PhoneNumber, Senior, Status)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(query, [firstName, lastName, jobId, birthDate, hireDate, companyId, departmentId, country, city, address, phoneNumber, senior, status], function(err) {
        if (err) {
            return res.status(500).send('Erreur lors de l\'ajout de l\'employé: ' + err.message);
        }
        res.redirect('/formular');
    });
});

app.post('/add-company', (req, res) => {
    const { companyName, companySize, activity } = req.body;

    const query = `INSERT INTO companies (CompanyName, CompanySize, Activity)
                   VALUES (?, ?, ?)`;

    db.run(query, [companyName, companySize, activity], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/formular');
    });
});


app.post('/add-job', (req, res) => {
    const { jobName } = req.body;

    const query = `INSERT INTO jobs (JobName) VALUES (?)`;

    db.run(query, [jobName], function(err) {
        if (err) {
            console.error('Error adding job:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/formular');
    });
});

app.post('/add-department', (req, res) => {
    const { companyId, departmentName } = req.body;

    const query = `INSERT INTO departements (CompanyId, DepartementName)
                   VALUES (?, ?)`;

    db.run(query, [companyId, departmentName], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.redirect('/formular');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});