import express from 'express';
import Loan from '../controllers/loanControllers';

const router = express.Router();

router.post('/', Loan.createLoan);
router.get('/', Loan.getAll);
router.get('/:id', Loan.getOne);
router.patch('/:id', Loan.patchLoan);
// GET /loans?status=approved&repaid=false
// router.get('/',Loan.getCurrent);
// router.get('/:?status=approved&repaid=false',Loan.getCurrent);
// getCurrent

export default router;
