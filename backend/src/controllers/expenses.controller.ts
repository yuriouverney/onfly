import { Request, Response, Router } from 'express';
import wrapAsync from '../util/middleware/wrap-async';
import { verifyToken } from '../util/middleware/token';
import { checkHasPermission } from '../util/middleware/check-has-permission';
import { ExpenseService } from '../services/expense.service';
import ResponseHelpers from '../util/response';


const router = Router();

/**
 * @openapi
 * /api/expenses:
 *   get:
 *     summary: Retrieve all expenses (Admin only)
 *     tags:
 *       - Expenses
 *     security:
 *       - authorization: []
 *     responses:
 *       200:
 *         description: List of all expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       401:
 *         description: Unauthorized
 */
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

/**
 * @openapi
 * /api/expenses/allbyuser:
 *   get:
 *     summary: Retrieve all expenses for the logged in user
 *     tags:
 *       - Expenses
 *     security:
 *       - authorization: []
 *     responses:
 *       200:
 *         description: List of expenses owned by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/allbyuser',
  verifyToken,
  checkHasPermission('read:allbyuser'),
  wrapAsync(async (req: Request, res: Response) => {
    const expenseService = new ExpenseService()
    const response = await expenseService.allExpensesByUser(req.user)
    ResponseHelpers.ok(res, response);
  })
);

/**
 * @openapi
 * /api/expenses/adm/{id}:
 *   get:
 *     summary: Retrieve a specific expense by ID (Admin only)
 *     tags:
 *       - Expenses
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       401:
 *         description: Unauthorized
 */
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

/**
 * @openapi
 * /api/expenses/{id}:
 *   get:
 *     summary: Retrieve an expense by ID for the logged in user
 *     tags:
 *       - Expenses
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense object for the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       401:
 *         description: Unauthorized
 */
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

/**
 * @openapi
 * /api/expenses:
 *   post:
 *     summary: Create a new expense
 *     tags:
 *       - Expenses
 *     security:
 *       - authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       201:
 *         description: Expense created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Invalid input
 */
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

/**
 * @openapi
 * /api/expenses/adm/{id}:
 *   put:
 *     summary: Update an existing expense (Admin only)
 *     tags:
 *       - Expenses
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: Expense updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Invalid input
 */
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

/**
 * @openapi
 * /api/expenses/{id}:
 *   put:
 *     summary: Update an existing expense
 *     tags:
 *       - Expenses
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: Expense updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Invalid input
 */
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

/**
 * @openapi
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags:
 *       - Expenses
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Expense deleted
 *       401:
 *         description: Unauthorized
 */
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

/**
 * @openapi
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense (Admin only)
 *     tags:
 *       - Expenses
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Expense deleted
 *       401:
 *         description: Unauthorized
 */
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