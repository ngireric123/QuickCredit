  import pool from './db';
  import moment from 'moment';
  import loans from '../models/loan';

  class repayment {
    
  static async updateBalance(id, data, loans){
    const newBalance = data.balance || loans[0].balance;
    this.newId = id;
    this.newData = [
    newBalance,
    this.newId,
    ];
      this.res = await pool.query('UPDATE loans SET balance = $1 WHERE id = $2 RETURNING *', this.newData);
      return [this.res.rows[0]];
  }

  static async getHistory(id) {
  this.res = await pool.query('SELECT * FROM repayments WHERE loans = $1', [id]);
  return this.res;
    }
}

export default repayment;
