import express from 'express';
import Loan from '../controllers/loanControllers';
import auth from '../middleware/auth';
import adminAccess from '../middleware/isAdmin';

const router = express.Router();

// router.post('/', auth, Loan.createLoan);
router.post('/', Loan.createLoan);
router.get('/', auth, adminAccess, Loan.getAll);
router.get('/:id', auth, adminAccess, Loan.getOne);
router.patch('/:id', auth, adminAccess, Loan.updateLoan);

export default router;
