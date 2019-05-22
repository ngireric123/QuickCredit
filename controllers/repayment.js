import moment from 'moment';
import pool from '../models/db';
import repayment from '../models/repayment';
import loans from '../models/loan';
import { validateRepayment } from '../helper/validation';


class repayments {

  // Create loan repayment

  static async createRepayment(req, res) {

    const error = validateRepayment(req.body);
    if (error) {
      res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }

   const findloan = await loans.checkId(req.params.id);

   const loanId = parseInt(req.params.id, 10);
   const createdon = moment().format('LLL');
   const paidamount = req.body.paidAmount;
   const amount = findloan[0].amount;
   const balance = findloan[0].balance - paidamount;
   const mothlyinstallment= findloan[0].paymentinstallment;
   findloan[0].balance = balance;
   const newRepayment = [
     createdon,
     loanId,
     amount,
     paidamount,
     balance,
     mothlyinstallment,
   ];
    //const repaymentCreation
    const repaymentCreation = await pool.query(`INSERT INTO repayments (createdon,  loans, amount,  paidamount, balance, monthlyinstallment)
   VALUES($1, $2, $3, $4, $5, $6)`, newRepayment);
    const newBalance = await repayment.updateBalance(loanId, balance,findloan);

    return res.status(201).json({
      status:201,
      message:`Repayment Created Successfully!`,
      data: newRepayment,
    });
  }
}
export default repayments;
