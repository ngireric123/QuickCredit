import express from 'express';
import Loan from '../controllers/loanControllers';
import userAuth from '../middleware/auth';

const router = express.Router();

router.post('/', userAuth.isAuth, Loan.createLoan);
// router.get('/', userAuth.isAuth, userAuth.adminAccess, Loan.getAll);
// router.get('/:id', userAuth.isAuth, userAuth.adminAccess, Loan.getOne);
router.patch('/:id', userAuth.isAuth, userAuth.adminAccess, Loan.updateLoan);
router.get('/', Loan.geCurrent);


export default router;
