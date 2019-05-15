import Joi from 'joi';

const loan_repayment = Joi.object().keys({
  amount:Joi.number().required(),
  mothlyInstallment: Joi.number().required(),
  paidAmount: Joi.number().required(),
  balance: Joi.number().required()
});
export default {
  loan_repayment

};
