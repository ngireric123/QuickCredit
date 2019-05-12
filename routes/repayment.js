import express from 'express';
import repayments from '../controllers/repayment';

const router = express.Router();

router.post('/:id/repayment', repayments.createRepayment);
router.get('/:id/repayments', repayments.getHistory);

export default router;
