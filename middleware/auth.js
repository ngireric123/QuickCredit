import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
class Authantication{
static async isAuth  (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return res.status(400).send({
      status: res.statusCode,
      error: 'you have no Authorization!',
    });
  }

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      status: res.statusCode,
      error: 'Provide token',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.users = decoded;
    return next();
  } catch (error) {
    return res.status('403').send({
      status: 403,
      error: 'Token you have provided is invalid',
    });
  }
};
}

export default Authantication;
