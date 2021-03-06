import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'underscore';

import User from '../models/user';
import { validateUser, validateLogin, validateStatus } from '../helper/validation';

  class userController{
   static async registerUser(req, res) {

    const error = validateUser(req.body);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }
     const emaili = await User.checkEmail2(req.body.email);
    if (!emaili) {
      res.status(400).json({
        status: 400,
        error: 'the email is already taken. the user already exist. register with another unique email',
      });
    }else{
    const addedUser = await User.addUser(req.body);
    const newUser = _.omit(addedUser[0], 'password');
    const token = jwt.sign({ newUser }, `${process.env.PRIVATE_KEY}`);
    return res.status(201).send({
      status: 201,
      data: [{
      token,
      user: newUser,
       }],
    });
  }
  }

  //  User Login

  static async loginUser(req, res) {
  const error = validateLogin(req.body);
  if (error) {
    return res.status(400).send({
      status: 400,
      error: error.details[0].message,
    });
  }
  const user = await User.checkStatus(req.body.email);
  if (user.length === 0 || user[0].status=== 'unverified') {
    return res.status(404).send({
      status: 404,
      error: 'check your email and password or your email is not verified ',
    });
  }
  const validPassword = await bcrypt.compare(req.body.password, user[0].password);
  if (validPassword) {
    const newUser = _.omit(user[0], 'password');
    const token = jwt.sign({ newUser }, `${process.env.PRIVATE_KEY}`, { expiresIn: '24h' });
    return res.status(200).send({
      status: 200,
      data: [{
        token,
        user: newUser,
      }],
    });
  }

  return res.status(404).send({
    status: 404,
    error: 'Wrong email or password',
  });
}

  // mark a user as verified

  static async patchUser(req, res) {

    const error = validateStatus(req.body);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }
    const result = await User.getOneUser(req.params.email);

     const findEmail = await User.checkEmail2(req.params.email);
     if(findEmail){
     return res.status(409).send({
         status: 409,
         error: 'E-mail not found in our system',
       });
   }

    const newLoan = await User.updateUser(req.params.email, req.body, result);
    res.status(200).send({
      status: 200,
      message: 'User Verified',
      data: newLoan,
    });
  }

}

export default userController;
