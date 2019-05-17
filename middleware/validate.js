import Joi from 'joi';

const validate = {

  validateRegistration(req, res, next) {
    const userSchema = Joi.object().keys({
      firstName: Joi.string().alphanum().min(2).max(15)
        .required(),
      lastName: Joi.string().alphanum().min(2).max(15)
        .required(),
      email: Joi.string().email({ minDomainAtomas: 2 })
        .required(),
      password: Joi.string().alphanum().min(8).max(15)
        .required(),
      status: Joi.string().min(2)
        .valid(['unverified', 'verified'])
        .trim(),
      isAdmin: Joi.string().min(2),
    });

    const { error } = Joi.validate(req.body, userSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

  validateLogin(req, res, next) {
    const loginSchema = Joi.object().keys({
      email: Joi.string().email({ minDomainAtomas: 2 })
        .required(),
      password: Joi.string().alphanum().min(3).max(15)
        .required(),
    });

    const { error } = Joi.validate(req.body, loginSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },
};

export default validate;
