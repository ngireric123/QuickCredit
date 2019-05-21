import express from 'express';
import Loan from '../controllers/loanControllers';
import userAuth from '../middleware/auth';

const router = express.Router();

router.post('/', userAuth.isAuth, Loan.createLoan);
router.get('/', userAuth.isAuth, userAuth.adminAccess, Loan.getAll);
router.get('/:id', Loan.getOne);
// router.patch('/:id', auth, adminAccess, Loan.updateLoan);

export default router;
