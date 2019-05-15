import Joi from 'joi';
import moment from 'moment';
import data from '../models/data';

class Loan {
  // create a loan
  static async createLoan(req, res) {
    const schema = {
      status: Joi.string().min(2)
        .valid(['pending', 'approved', 'rejected'])
        .trim(),
      firstName: Joi.string().regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/).min(2).required(),
      lastName: Joi.string().regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/).min(2).required(),
      email: Joi.string().email().trim().required(),
      tenor: Joi.number().max(12).required(),
      amount: Joi.number().required(),
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) {
      res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }
    const {
      firstName, lastName, email, amount, tenor,
    } = req.body;
    const balance = parseFloat(amount);
    const interest = 0.05 * parseFloat(amount);
    const paymentInstallment = ((parseFloat(amount) + interest) / tenor);
    const status = 'pending';
    const createdOn = moment().format('LLL');
    const repaid = false;
    const id = data.loanDummy.length + 1;
    const totalAmount = amount + paymentInstallment;

    const newLoan = {
      id,
      firstName,
      lastName,
      email,
      status,
      tenor,
      amount,
      repaid,
      createdOn,
      paymentInstallment,
      balance,
      totalAmount,
    };
    data.loanDummy.push(newLoan);
    res.status(201).send({
      status: 201,
      message: 'Loan created',
      data: newLoan,
    });
  }

  // get all  loan

  static async getAll(req, res) {
    const statusLoan = req.query.status;
    const repaidLoan = req.query.repaid;

    const currentLoan = data.loanDummy.filter(
      loan => loan.status === statusLoan && loan.repaid === repaidLoan
    );
    if (currentLoan.length !== 0) {
        res.status(200).send({
        status: 200,
        data: currentLoan,
      });
    }else if(!statusLoan && !repaidLoan){
      res.status(200).send({
      status: 200,
      data: data.loanDummy,
    });
  }else{
     res.status(404).send({
      status: 404,
      message: 'no loan found',
    });
    }
  }

  // Approve or reject a loan application(patch)

  static async updateLoan(req, res) {
    const loanId = parseInt(req.params.id, 10);
    let job = '';
    for (let i = 0; i < data.loanDummy.length; i += 1) {
      if (data.loanDummy[i].id === loanId) {
        const schema = {
          status: Joi.string().min(3).trim(),
        };
        const { error } = Joi.validate(req.body, schema);
        if (error) {
          return res.status(400).send({
            status: 400,
            error: error.details[0].message,
          });
        }
        if (req.body.status) data.loanDummy[i].status = req.body.status;
        if (req.body.firstName) data.loanDummy[i].firstName = req.body.firstName;
        if (req.body.lastName) data.loanDummy[i].lastName = req.body.lastName;
        job = 'done';
        return res.status(200).send({
          status: 200,
          data: data.loanDummy[i],
        });
      }
    }
    if (job !== 'done') {
      return res.status(404).send({
        status: 404,
        error: 'Loan not found',
      });
    }
  }

  // get a specific loan

  static async getOne(req, res) {
    const loanId = parseInt(req.params.id, 10);
    const result = [];
    for (let i = 0; i < data.loanDummy.length; i += 1) {
      if (data.loanDummy[i].id === loanId) {
        result.push(data.loanDummy[i]);
      }
    }
    if (result.length === 0) {
      return res.status(404).send({
        status: 404,
        error: 'loan not found',
      });
    }
    return res.status(200).send({
      status: 200,
      data: result,
    });
  }
}
export default Loan;
