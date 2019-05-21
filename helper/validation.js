import Joi from 'joi';

export const validateUser = (data) => {
  const schema = {
    email: Joi.string().email().required().trim(),
    firstName: Joi.string().min(5).required().trim(),
    lastName: Joi.string().min(5).required().trim(),
    address: Joi.string().min(3).required().trim(),
    password: Joi.string().min(8).required().trim(),
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
    tenor: Joi.number().max(12).required(),
    amount: Joi.number().required(),
  };

  const { error } = Joi.validate(data, schema);
  return error;
};
