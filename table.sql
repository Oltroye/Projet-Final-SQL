CREATE TABLE IF NOT EXISTS jobs (
    JobId Integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    JobName VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS companies (
    CompanyId Integer PRIMARY KEY NOT NULL,
    CompanyName VARCHAR(50) NOT NULL,
    CompanySize INTEGER NOT NULL,
    Activity VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    ProductId Integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    ProductName VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS departements (
    DepartementId Integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    CompanyId Integer,
    DepartementName VARCHAR(30),
    FOREIGN KEY (CompanyId) REFERENCES companies(CompanyId)
);

CREATE TABLE IF NOT EXISTS employees (
    EmpoyeeId Integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    JobId Integer NOT NULL,
    BirthDate DATE NOT NULL,
    HireDate DATE NOT NULL,
    CompanyId Integer NOT NULL,
    DepartementId Integer NOT NULL,
    Country VARCHAR(50) NOT NULL,
    City VARCHAR(50) NOT NULL,
    Address VARCHAR(50) NOT NULL,
    PhoneNumber VARCHAR(10) NOT NULL,
    Senior Integer,
    Status BOOLEAN NOT NULL,
    FOREIGN KEY (CompanyId) REFERENCES companies(CompanyId),
    FOREIGN KEY (JobId) REFERENCES jobs(JobId),
    FOREIGN KEY (DepartementId) REFERENCES departements(DepartementId)
);

CREATE TABLE IF NOT EXISTS departement_job (
    JobId Integer NOT NULL,
    DepartementId Integer NOT NULL,
    FOREIGN KEY (JobId) REFERENCES jobs(JobId),
    FOREIGN KEY (DepartementId) REFERENCES departements(DepartementId)
);

CREATE TABLE IF NOT EXISTS employee_product (
    ProductId Integer NOT NULL,
    EmpoyeeId Integer NOT NULL,
    FOREIGN KEY (ProductId) REFERENCES products(ProductId),
    FOREIGN KEY (EmpoyeeId) REFERENCES employees(EmpoyeeId)
);