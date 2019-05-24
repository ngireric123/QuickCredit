import Joi from 'joi';

export const validateUser = (data) => {
  const schema = {
    email: Joi.string().email().required(),
    firstName: Joi.string().min(1).required().regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/),
    lastName: Joi.string().min(2).required().regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/),
    address: Joi.string().min(3).required().trim(),
    password: Joi.string().min(8).required().regex(/^[a-zA-Z0-9]{6,30}$/),
    isAdmin: Joi.string(),
    status: Joi.string(),

  };
  const { error } = Joi.validate(data, schema);
  return error;
};

export const validateLogin = (data) => {
  const schema = {
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(8).required().trim(),
  };
  const { error } = Joi.validate(data, schema);
  return error;
};

export const validateLoan = (data) => {
  const schema = {
    status: Joi.string().min(2)
      .valid(['pending', 'approved', 'rejected'])
      .trim(),
    email: Joi.string().email().trim().required(),
    tenor: Joi.number().max(12).positive().required(),
    amount: Joi.number().required().positive(),
  };
  const { error } = Joi.validate(data, schema);
  return error;
};

export const validateStatus = (data) => {
  const schema = {
    status: Joi.string().min(2)
      .valid(['verified', 'unverified'])
      .trim(),
  };
  const { error } = Joi.validate(data, schema);
  return error;
};

export const validateLoanStatus = (data) => {
  const schema = {
    status: Joi.string().min(2)
      .valid(['pending', 'approved', 'rejected'])
      .trim(),
  };
  const { error } = Joi.validate(data, schema);
  return error;
};

export const validateRepayment = (data) => {
  const schema = {
    paidAmount: Joi.number().required().positive(),
  };
  const { error } = Joi.validate(data, schema);
  return error;
};
