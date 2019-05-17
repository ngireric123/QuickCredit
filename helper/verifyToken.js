import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


export default {
  getToken(payload) {
    const token = jwt.sign(payload, `${process.env.PRIVATE_KEY}`, { expiresIn: '24h' });
    return token;
  },
};
