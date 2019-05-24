import express from 'express';
import repayments from '../controllers/repayment';
import userAuth from '../middleware/auth';

const router = express.Router();
router.post('/:id/repayment', userAuth.isAuth, userAuth.adminAccess, repayments.createRepayment);
router.get('/:id/repayments', userAuth.isAuth, repayments.getRepaymentHistory);

export default router;
