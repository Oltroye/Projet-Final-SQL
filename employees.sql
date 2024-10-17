CREATE TABLE IF NOT EXISTS jobs (
    JobUuid VARCHAR(80) PRIMARY KEY NOT NULL,
    JobName VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS companies (
    CompanyUuid VARCHAR(80) PRIMARY KEY NOT NULL,
    CompanyName VARCHAR(50) NOT NULL,
    CompanySize INTEGER NOT NULL,
    Activity VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    ProductUuid VARCHAR(80) PRIMARY KEY NOT NULL,
    ProductName VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS departements (
    DepartementUuid VARCHAR(80) PRIMARY KEY NOT NULL,
    CompanyUuid VARCHAR(80),
    DepartementName VARCHAR(30),
    FOREIGN KEY (CompanyUuid) REFERENCES companies(CompanyUuid)
);

CREATE TABLE IF NOT EXISTS employees (
    EmpoyeeUuid VARCHAR(80) PRIMARY KEY NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    JobUuid VARCHAR(80) NOT NULL,
    BirthDate DATE NOT NULL,
    HireDate DATE NOT NULL,
    CompanyUuid VARCHAR(80) NOT NULL,
    DepartementUuid VARCHAR(80) NOT NULL,
    Country VARCHAR(50) NOT NULL,
    City VARCHAR(50) NOT NULL,
    Address VARCHAR(50) NOT NULL,
    PhoneNumber VARCHAR(10) NOT NULL,
    Senior VARCHAR(80),
    Status BOOLEAN NOT NULL,
    FOREIGN KEY (CompanyUuid) REFERENCES companies(CompanyUuid),
    FOREIGN KEY (JobUuid) REFERENCES jobs(JobUuid),
    FOREIGN KEY (DepartementUuid) REFERENCES departements(DepartementUuid)
);

CREATE TABLE IF NOT EXISTS departement_job (
    JobUuid VARCHAR(80) NOT NULL,
    DepartementUuid VARCHAR(80) NOT NULL,
    FOREIGN KEY (JobUuid) REFERENCES jobs(JobUuid),
    FOREIGN KEY (DepartementUuid) REFERENCES departements(DepartementUuid)
);

CREATE TABLE IF NOT EXISTS employee_product (
    ProductUuid VARCHAR(80) NOT NULL,
    EmpoyeeUuid VARCHAR(80) NOT NULL,
    FOREIGN KEY (ProductUuid) REFERENCES products(ProductUuid),
    FOREIGN KEY (EmpoyeeUuid) REFERENCES employees(EmpoyeeUuid)
);