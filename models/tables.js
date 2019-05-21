import pool from './db';


const tablesCreate = () => {
  const users = `CREATE TABLE IF NOT EXISTS
     users(
       id SERIAL PRIMARY KEY,
       email VARCHAR(50) UNIQUE NOT NULL,
       "firstName" VARCHAR(24) NOT NULL,
       "lastName" VARCHAR(10) NOT NULL,
       password VARCHAR(80) NOT NULL,
       address VARCHAR(50) NOT NULL,
       status VARCHAR(80) NOT NULL,
       "isAdmin" BOOLEAN NOT NULL DEFAULT false
     )`;
  const loans = `CREATE TABLE IF NOT EXISTS
    loans(
     id SERIAL PRIMARY KEY,
     email VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE,
     "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     status VARCHAR(50) NOT NULL DEFAULT 'pending',
     repaid BOOLEAN NOT NULL DEFAULT false,
     tenor INT NOT NULL,
     amount FLOAT NOT NULL,
     paymentInstallment FLOAT,
     balance FLOAT NOT NULL,
     interest FLOAT NOT NULL,
     totalAmount FLOAT NOT NULL
    )`;
  const repayments = `CREATE TABLE IF NOT EXISTS
   repayments(
     id SERIAL PRIMARY KEY,
     createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     loans INT NOT NULL REFERENCES loans(id) ON DELETE CASCADE ON UPDATE CASCADE,
     amount FLOAT NOT NULL,
     paidAmount FLOAT NOT NULL,
     balance FLOAT NOT NULL,
     monthlyInstallment FLOAT NOT NULL
   )`;
  const newUserTable = `INSERT INTO
  users(
    email,
    "firstName",
    "lastName",
    password,
    address,
    status,
    "isAdmin"
    ) VALUES (
    'ngireric123@gmail.com',
    'ngirababyeyi',
    'erico',
    '12345678',
    'KIMIRONKO',
    'verified',
    true
    )`;
  const queries = `${users};${loans};${repayments};${newUserTable}`;
  pool.query(queries);
  pool.query(queries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

const tablesDelete = () => {
  const users = 'DROP TABLE IF EXISTS users CASCADE';
  const loans = 'DROP TABLE IF EXISTS loans CASCADE';
  const repayments = 'DROP TABLE IF EXISTS repayments';
  const deleteQueries = `${users};${loans}; ${repayments}`;
  pool.query(deleteQueries);
};

module.exports = {
  tablesCreate,
  tablesDelete,

};

require('make-runnable');
