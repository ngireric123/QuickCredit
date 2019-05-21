import express from 'express';
import userController from '../controllers/user';
import userAuth from '../middleware/auth';

const router = express.Router();

router.post('/auth/signup', userController.registerUser);
router.post('/auth/login', userController.loginUser);
// router.patch('/users/:email/verify', userAuth.isAuth, userAuth.adminAccess, userController.patchUser);

router.patch('/users/:email/verify', userController.patchUser);

export default router;
