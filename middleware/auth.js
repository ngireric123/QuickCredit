import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
class Authentication {

  // authenticate user

 static isAuth  (req, res, next) {
  if (req.headers.authorization === undefined) {
    return res.status(400).send({
      status: res.statusCode,
      error: 'you have no Authorization for this system!',
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

// authenticate admin

static async adminAccess (req, res, next){
  if (req.users.user.isAdmin) {
    return next();
  }
  return res.status(403).send({
    status: 403,
    error: 'you are not an admin',
  });
};
}
export default Authentication;
