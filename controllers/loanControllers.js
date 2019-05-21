import loans from '../models/loan';
import User from '../models/user';
import { validateLoan } from '../helper/validation';

class Loan {
  // create a loan
  static async createLoan(req, res) {

    const error = validateLoan(req.body);
    if (error) {
      res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }
    const emaili = await User.checkEmail(req.body.email);
    const findLoan = await loans.checkLoan(req.body.email);
    if (!findLoan) {
     return res.status(409).send({
       status: 409,
       error: 'You have a loan to pay first',
     });
   }else if (!emaili) {
     return res.status(409).send({
       status: 409,
       error: 'the email you are entering is not registered',
     });
   }else {

    const newLoan = await loans.create(req.body);
    res.status(201).send({
      status: 201,
      message: 'Loan created',
      data: newLoan,
    });
  }
  }
}
export default Loan;
