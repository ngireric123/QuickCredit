import express from 'express';
import Loan from '../controllers/loanControllers';

const router = express.Router();

router.post('/', Loan.createLoan);
router.get('/', Loan.getAll);
router.get('/:id', Loan.getOne);
router.patch('/:id', Loan.updateLoan);

export default router;
