import express from 'express';
import controller from '../controllers/user';
import user from '../middleware/validate';
import auth from '../middleware/auth';
import adminAccess from '../middleware/isAdmin';

const router = express.Router();

router.post('/auth/signup', user.validateRegistration, controller.registerUser);
router.post('/auth/login', user.validateLogin, controller.loginUser);
router.patch('/users/:email/verify', auth, adminAccess, controller.patchUser);
export default router;
