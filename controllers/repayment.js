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
   if (findloan.length === 0){
     return res.status(404).send({
       status: 404,
       error: 'the loan you are trying to pay is not registered',
     });
   }
   const amount = findloan[0].amount;
   console.log(findloan[0].balance - paidamount);
   if (findloan[0].balance - paidamount < 0){
     return res.status(400).send({
       status: 400,
       error: 'do not pay a lot of money',
     });
   }
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

  if (findloan[0].status === 'pending'){
    return res.status(400).send({
      status: 400,
      error: `You can not pay a loan which is ${findloan[0].status}`,
    });
  }
  // else if()
    const repaymentCreation = await pool.query(`INSERT INTO repayments (createdon,  loans, amount,  paidamount, balance, monthlyinstallment)
   VALUES($1, $2, $3, $4, $5, $6)`, newRepayment);
    const newBalance = await repayment.updateBalance(loanId, balance,findloan);

    return res.status(201).json({
      status:201,
      message:`Repayment Created Successfully!`,
      data: newRepayment,
    });
  }

  // Loan Repayment History

  static async getRepaymentHistory(req, res) {

    if (isNaN(req.params.id)) {
     return res.status(400).send({
       status: 400,
       error: 'this url is invalid',
     });
   }
    const result = await repayment.getHistory(req.params.id);
   if (result.rows.length === 0) {
    return res.status(404).send({
      status: 404,
      error: 'Repayment you are looking for is not registered',
    });
  }
   return res.status(200).send({
    status: 200,
    data: result.rows,
   });
  }
}
export default repayments;
