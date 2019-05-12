import jwt from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import dummy from '../models/dummy';

const users = {

  // User Registration

  registerUser(req, res) {
    const {
      firstName, lastName, email, password, status,
    } = req.body;
    const emaili = dummy.users.filter(user => user.email === email);
    if (emaili.length !== 0) {
      res.status(400).json({
        status: 400,
        error: 'the email is already taken. the user already exist. register with another unique email',
      });
    } else {
      const id = dummy.users.length + 1;
      const user = new User(
        id, firstName, lastName, email, password, status,
      );
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;
      const token = jwt.sign({ user: dummy.users.push(user) }, 'secret-key');
      res.status(201).json({
        status: 201, success: 'user registered', data: [{ token, user }],
      });
    }
  },

  //  User Login

  loginUser(req, res) {
    const {
      email, password,
    } = req.body;
    for (let i = 0; i < dummy.users.length; i += 1) {
      if (dummy.users[i].email === email) {
        const { firstName } = dummy.users[i];
        const { lastName } = dummy.users[i];
        // eslint-disable-next-line no-shadow
        const { email } = dummy.users[i];
        const truePass = bcrypt.compareSync(password, dummy.users[i].password);
        if (truePass) {
          const token = jwt.sign({ user: dummy.users[i] }, 'secret-key', { expiresIn: '1h' });
          res.status(200).json({
            status: 200,
            success: 'logged in',
            data: [{
              token, firstName, lastName, email,
            }],
          });
        } else {
          res.status(400).json({ status: 400, error: 'incorrect password' });
        }
        return;
      }
    }
    res.status(400).json({ status: 400, error: 'invalid email' });
  },

  // mark a user as verified

  patchUser(req, res) {
    const userEmail = req.params.email;
    let job = '';
    for (let i = 0; i < dummy.users.length; i += 1) {
      if (dummy.users[i].email === userEmail) {
        const schema = {
          status: Joi.string().required(),
        };
        const { error } = Joi.validate(req.body, schema);
        if (error) {
          return res.status(400).send({
            status: 400,
            error: error.details[0].message,
          });
        }
        if (req.body.status) dummy.users[i].status = req.body.status;
        job = 'done';
        return res.status(200).send({
          status: 200,
          data: dummy.users[i],
        });
      }
    }

    if (job !== 'done') {
      return res.status(404).send({
        status: 404,
        error: 'User E-mail not found',
      });
    }
  },
};

export default users;
