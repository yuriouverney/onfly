import { Router } from 'express';
import AuthOrgaoController  from './auth.controller';
import ExpensesController  from './expenses.controller';

const router = Router();

//Auth
router.use('/auth', AuthOrgaoController);

//Expenses
router.use('/expenses', ExpensesController);

export default router;