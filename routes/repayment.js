import express from 'express';
import repayments from '../controllers/repayment';
import auth from '../middleware/auth';
// import adminAccess from '../middleware/isAdmin';

const router = express.Router();

// router.post('/:id/repayment', auth, adminAccess, repayments.createRepayment);
router.get('/:id/repayments', auth, repayments.getHistory);

export default router;
