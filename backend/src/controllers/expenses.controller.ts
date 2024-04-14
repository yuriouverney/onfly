import { Request, Response, Router } from 'express';
import wrapAsync from '../util/middleware/wrap-async';
import { verifyToken } from '../util/middleware/token';
import { checkHasPermission } from '../util/middleware/check-has-permission';
import { ExpenseService } from '../services/expense.service';
import ResponseHelpers from '../util/response';


const router = Router();

// Only for ADMs
router.get(
  '/',
  verifyToken,
  checkHasPermission('read:allexpenses'),
  wrapAsync(async (req: Request, res: Response) => {
    const expenseService = new ExpenseService()
    const response = await expenseService.findAll()
    ResponseHelpers.ok(res, response);
  })
);

router.get(
  '/allbyuser',
  verifyToken,
  checkHasPermission('read:allbyuser'),
  wrapAsync(async (req: Request, res: Response) => {
    const expenseService = new ExpenseService()
    const filter = {where: {userId: req.user.id}}
    const response = await expenseService.findAll(filter)
    ResponseHelpers.ok(res, response);
  })
);

// Only for ADMs
router.get(
  '/adm/:id',
  verifyToken,
  checkHasPermission('read:anyexpensebyid'),
  wrapAsync(async (req: Request, res: Response) => {
    const expenseService = new ExpenseService()
    const id  = +req.params.id;
    const response = await expenseService.getExpenseById(id)
    ResponseHelpers.ok(res, response);
  })
);

router.get(
  '/:id',
  verifyToken,
  checkHasPermission('read:expensebyid'),
  wrapAsync(async (req: Request, res: Response) => {
    const expenseService = new ExpenseService()
    const id  = +req.params.id;
    const userId = req.user.id;
    const response = await expenseService.getUserExpenseById(id, userId)
    ResponseHelpers.ok(res, response);
  })
);

router.post(
  '/',
  verifyToken,
  checkHasPermission('create:expense'),
  wrapAsync(async (req: Request, res: Response) => {
    const expenseService = new ExpenseService()
    const values = req.body;
    values.userId = req.user.id
    const response = await expenseService.create(values)
    ResponseHelpers.created(res, response);
  })
);

// Only for ADMs
router.put(
  '/adm/:id',
  verifyToken,
  checkHasPermission('update:anyexpense'),
  wrapAsync(async (req: Request, res: Response) => {
    const expenseService = new ExpenseService()
    const values = req.body;
    const id  = +req.params.id;
    const userId = req.user.id
    const response = await expenseService.updateExpense(id, values, userId)
    ResponseHelpers.updated(res, response);
  })
);

router.put(
  '/:id',
  verifyToken,
  checkHasPermission('update:expense'),
  wrapAsync(async (req: Request, res: Response) => {
    const expenseService = new ExpenseService()
    const values = req.body;
    const id  = +req.params.id;
    const userId = req.user.id
    const response = await expenseService.updateUserExpense(id, values, userId)
    ResponseHelpers.updated(res, response);
  })
);

router.delete(
  '/:id',
  verifyToken,
  checkHasPermission('delete:expense'),
  wrapAsync(async (req: Request, res: Response) => {
    const expenseService = new ExpenseService()
    const id  = +req.params.id;
    const userId = req.user.id;
    const response = await expenseService.deleteByUser(id, userId)
    ResponseHelpers.deleted(res, response);
  })
);

// Only for ADMs
router.delete(
  '/adm/:id',
  verifyToken,
  checkHasPermission('delete:anyexpense'),
  wrapAsync(async (req: Request, res: Response) => {
    const expenseService = new ExpenseService()
    const id  = +req.params.id;
    const response = await expenseService.deleteById(id)
    ResponseHelpers.deleted(res, response);
  })
);

export default router;