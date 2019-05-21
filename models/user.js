import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './db';

class userModels {

  async checkEmail(email) {
    this.user = [];
    this.res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (this.res.rowCount > 0) {
      this.user.push(this.res.rows[0]);
   }
    return this.user;

 }

  async verifyUser(email, data, users){
    const newStatus = data.status || users[0].status;
    this.newData = [
    data.status,
    data.email,
    ];
      this.res = await pool.query('UPDATE users SET status = $1 WHERE email = $2 RETURNING *', this.newData);

      return [this.res.rows[0]];
  }
  async checkEmail2(email) {
   this.res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (this.res.rowCount < 1) {
        return true;
      }
    return false;
 }

  async getOneUser(email) {
    this.res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return this.res;
  }

  async addUser(data) {
   this.salt = await bcrypt.genSalt(8);
   this.password = await bcrypt.hash(data.password, this.salt);
   this.newUser = [
     data.email.trim(),
     data.firstName.trim(),
     data.lastName.trim(),
     data.address.trim(),
     this.password.trim(),
     data.status.trim(),
   ];
   this.res = await pool.query(`INSERT INTO
     users(
     email,
     "firstName",
     "lastName",
     address,
     password,
     status
     )
     VALUES($1, $2, $3, $4, $5,$6) RETURNING *
   `, this.newUser);
   return [this.res.rows[0]];
 }
}

export default new userModels;
