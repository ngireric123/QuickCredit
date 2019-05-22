import express from 'express';
import repayments from '../controllers/repayment';
import userAuth from '../middleware/auth';
// import adminAccess from '../middleware/isAdmin';

const router = express.Router();
router.post('/:id/repayment', repayments.createRepayment);
// router.post('/:id/repayment', userAuth.isAuth, repayments.createRepayment);
// router.get('/:id/repayments', userAuth.isAuth, repayments.getHistory);

export default router;
