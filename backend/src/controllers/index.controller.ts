import { Router } from 'express';
import AuthController from './auth.controller';
import ExpensesController from './expenses.controller';

const router = Router();

//Auth
router.use('/auth', AuthController);

//Expenses
router.use('/expenses', ExpensesController);

export default router;
