import loans from '../models/loan';
import User from '../models/user';
import { validateLoan, validateLoanStatus } from '../helper/validation';

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
    if (req.users.newUser.email !== req.body.email){
      return res.status(400).send({
        status: 400,
        error: 'the Email you are trying to use is not yours',
      });
    }
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
  // Get on Loan
  static async getOne(req, res) {

    if (isNaN(req.params.id)) {
     return res.status(400).send({
       status: 400,
       error: 'invalid url',
     });
   }
    const result = await loans.getOneLoan(req.params.id);
   if (result.rows.length === 0) {
    return res.status(404).send({
      status: 404,
      error: 'Loan you are looking for is not registered',
    });
  }
   return res.status(200).send({
    status: 200,
    data: result.rows[0],
   });
  }

  // Get all Loan & Get current loan & Get all repaid loan

  static async geCurrent(req, res) {
    const statusLoan = req.query.status;
    const repaidLoan = req.query.repaid;
    const results = await loans.getAllLoan();
    const currentLoan = await loans.geCurrenttLoan(statusLoan, repaidLoan );
   if (currentLoan.length !== 0) {
        res.status(200).send({
        status: 200,
        data: currentLoan,
      });
    }else if(!statusLoan && !repaidLoan){
   res.status(200).send({
   status: 200,
   data: results,
 });
}else{
  res.status(404).send({
   status: 404,
   message: 'no loan found',
 });
 }
}



  // Approve or reject loan Application

  static async updateLoan(req, res) {

    const error = validateLoanStatus(req.body);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }
    const result = await loans.getOneLoan(req.params.email);

     const findId = await loans.checkId(req.params.id);
     if(findId.length === 0){
     return res.status(400).send({
         status: 400,
         error: 'ID you enter is not found in our system',
       });
   }

    const newLoan = await loans.patchLoan(req.params.id, req.body, result);
    res.status(200).send({
      status: 200,
      data: newLoan,
    });
  }
}
export default Loan;
