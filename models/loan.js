import pool from './db';
import moment from 'moment';
class loans {

  // Create a loan
  
   async create(data) {
      this.interest = 0.05 * parseFloat(data.amount);
      this.paymentInstallment = ((parseFloat(data.amount) + this.interest ) / data.tenor);
     this.createdOn = moment().format('LLL');

     const newLoan = [
     data.email.trim(),
     this.createdOn,
     this.status = 'pending',
     this.repaid = false,
     data.tenor,
     data.amount,
     this.paymentInstallment,
     this.balance = parseFloat(data.amount),
     this.interest = 0.05 * parseFloat(data.amount),
     this.totalAmount = data.amount + this.interest,
      ];
     this.res = await pool.query(`INSERT INTO
     loans (
      email,
      "createdOn",
      status,
      repaid,
      tenor,
      amount,
      paymentInstallment,
      balance,
      interest,
      totalAmount
     )
     VALUES($1, $2, $3, $4, $5, $6, $7, $8 ,$9 ,$10) RETURNING *
     `, newLoan);
     return [this.res.rows[0]];

     }
    async checkLoan(email, repaid) {
     const res = await pool.query('SELECT * FROM loans WHERE email = $1 AND repaid = false', [email.trim()]);
     if (res.rowCount < 1) {
     return true;
     }
     return false;
    }

 // get one loan method

  async getOneLoan(id) {
  this.res = await pool.query('SELECT * FROM loans WHERE id = $1', [id]);
  return this.res;
    }

    // get all loan method

  async getAllLoan() {
     this.res = await pool.query('SELECT * FROM loans');
     return this.res.rows;
  }

   // Patch Loan

  async patchLoan(id, data, loans){
    const newStatus = data.status || loans[0].status;
    this.newId = id;
    this.newData = [
    newStatus,
    this.newId,
    ];
      this.res = await pool.query('UPDATE loans SET status = $1 WHERE id = $2 RETURNING *', this.newData);
      return [this.res.rows[0]];
  }

  // check ID

  async checkId(id) {
    this.loan = [];
   this.res = await pool.query('SELECT * FROM loans WHERE id = $1', [id]);
      if (this.res.rowCount === 1) {
        this.loan.push(this.res.rows[0]);
      }
    return this.loan;
 }
}
export default new loans();
