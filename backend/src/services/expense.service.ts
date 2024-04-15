import { BaseCrudService } from './base/base-crud.service';
import Expense from "../models/expense.model";
import { ThrowError } from '../util/error';
import User from '../models/user.model';
import { UserService } from './user.service';

export class ExpenseService extends BaseCrudService<typeof Expense> {
  constructor() {
    super(Expense);
  }

  async allExpensesByUser(reqUser: any): Promise<Expense[]> {
    const userService = new UserService();
    const user: User = await userService.findById(reqUser.id) as User;
    if (!user) {
      ThrowError.throwDatabaseError('No User found!');
    }
    const expenses = await user.getExpenses();
    return expenses;
  }

  async getExpenseById(id: number) {
    if (!id) {
      ThrowError.throwDatabaseError('No ID found!')
    }
    const expense = await this.findById(id)

    if(!expense) {
      ThrowError.throwDatabaseError('No Expense found!')
    }
    
    return expense;
  }

  
  async getUserExpenseById(id: number, userId: number) {
    if (!id) {
      ThrowError.throwDatabaseError('No ID found!')
    }
    const expense: Expense = await this.findById(id) as Expense;

    if(!expense) {
      ThrowError.throwDatabaseError('No Expense found!')
    };

    if (expense && expense.userId != userId) {
      ThrowError.throwValidationError('Only the expense creator can see it.')
    }

    return expense;
  }

  async updateExpense(id: number, values: Expense, userId: number) {
    if (!id) {
      ThrowError.throwDatabaseError('No ID found!')
    }
    const expense = await this.findById(id)

    if(!expense) {
      ThrowError.throwDatabaseError('No Expense found!')
    }

    values.updatedBy = userId;

    return this.updatedById(id, values);
  }

  async updateUserExpense(id: number, values: Expense, userId: number) {
    if (!id) {
      ThrowError.throwDatabaseError('No ID found!')
    }
    const expense: Expense = await this.findById(id) as Expense

    if(!expense) {
      ThrowError.throwDatabaseError('No Expense found!')
    }

    if (expense && expense.userId != userId) {
      ThrowError.throwValidationError('Only the expense creator can see it.')
    }

    values.updatedBy = userId;

    return this.updatedById(id, values);
  }

  async deleteByUser(id: number, userId: number) {
    if (!id) {
      ThrowError.throwDatabaseError('No ID found!')
    }
    const expense: Expense = await this.findById(id) as Expense
    if(!expense) {
      ThrowError.throwDatabaseError('No Expense found!')
    };
    if (expense && expense.userId != userId) {
      ThrowError.throwValidationError('Only the expense creator can delete it.')
    }
    return this.deleteById(id)
  }

}