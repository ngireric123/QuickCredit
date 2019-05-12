import Joi from 'joi';
import moment from 'moment';
// import loans from '../models/loan';
import dummy from '../models/dummy';

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
      return res.status(400).send({
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
    const id = dummy.loanDummy.length + 1;
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
    dummy.loanDummy.push(newLoan);
    return res.status(201).send({
      status: 201,
      message: 'Loan created',
      data: newLoan,
    });
  }

  // get all  loan

  static async getAll(req, res) {
    return res.status(200).send({
      status: 200,
      data: dummy.loanDummy,
    });
  }

  // Approve or reject a loan application(patch)

  static async patchLoan(req, res) {
    const loanId = parseInt(req.params.id, 10);
    let job = '';
    for (let i = 0; i < dummy.loanDummy.length; i += 1) {
      if (dummy.loanDummy[i].id === loanId) {
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
        if (req.body.status) dummy.loanDummy[i].status = req.body.status;
        if (req.body.firstName) dummy.loanDummy[i].firstName = req.body.firstName;
        if (req.body.lastName) dummy.loanDummy[i].lastName = req.body.lastName;
        job = 'done';
        return res.status(200).send({
          status: 200,
          data: dummy.loanDummy[i],
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
    for (let i = 0; i < dummy.loanDummy.length; i += 1) {
      if (dummy.loanDummy[i].id === loanId) {
        result.push(dummy.loanDummy[i]);
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

  // Get current loan

  static async getCurrent(req, res) {
    const statusLoan = req.params.status;
    const repaidLoan = req.params.repaid;
    const currentLoan = dummy.loanDummy.find(
      loan => loan.status === statusLoan && loan.repaid === repaidLoan,
    );
    if (!currentLoan) {
      return res.json(404).send({
        status: 404,
        data: 'current loan not found',
      });
    }
    return res.json({
      status: 200,
      message: 'Current loan',
      data: currentLoan,
    });
    // res.send(dummy.loanDummy(req.query.status)
  }
}
export default Loan;
