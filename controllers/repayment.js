import Joi from 'joi';
import moment from 'moment';
import data from '../models/data';

class repayments {
  // Create loan repayment

  static async createRepayment(req, res) {
    const schema = {
      paidAmount: Joi.number().required().required(),
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }
    const findLoan = data.loanDummy.find(
      loanDummy => loanDummy.id === parseInt(req.params.id, 10),
    );
    if (!findLoan) {
      return res.status(400).send({
        status: 400,
        error: 'Loan you are looking for is not registered',
      });
    }
    const id = data.loanRepayment.length + 1;
    const loanId = parseInt(req.params.id, 10);
    const createdOn = moment().format('LLL');
    const { paidAmount } = req.body;
    if (findLoan.balance - paidAmount < 0) {
      return res.status(400).send({
        status: 400,
        error: 'do not pay a lot of money',
      });
    }
    const { amount } = findLoan.amount;
    const balance = findLoan.balance - paidAmount;
    const mothlyInstallment = findLoan.mothlyInstallment;
    findLoan.balance = balance;
    if (findLoan.balance === 0) {
      findLoan.repaid = 'true';
    }

    const newRepayment = {
      id,
      loanId,
      createdOn,
      paidAmount,
      balance,
      amount,
      mothlyInstallment,
    };

    if (!(findLoan.status === 'approved' && findLoan)) {
      return res.status(400).send({
        status: 400,
        message: `this loan is ${findLoan.status} `,
      });
    } else if (balance >= 0) {
      data.loanRepayment.push(newRepayment);
      return res.status(201).send({
        status: 201,
        data: newRepayment,
      });
    } else {
      return res.status(400).send({
        status: 400,
        message: 'error',
      });
    }
  }

  // Loan repayment history

  static async getHistory(req, res) {
    const repaymentId = parseInt(req.params.id, 10);
    const resultArray = [];
    for (let i = 0; i < data.loanRepayment.length; i += 1) {
      if (data.loanRepayment[i].loanId === repaymentId) {
        resultArray.push(data.loanRepayment[i]);
      }
    }
    if (resultArray.length === 0) {
      return res.status(404).send({
        status: 404,
        error: 'Repayment history not found',
      });
    }
    return res.status(200).send({
      status: 200,
      data: resultArray,
    });
  }
}

export default repayments;
