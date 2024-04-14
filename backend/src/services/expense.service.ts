import { BaseCrudService } from './base/base-crud.service';
import Expense from "../models/expense.model";
import { ThrowError } from '../util/error';

export class ExpenseService extends BaseCrudService<typeof Expense> {
  constructor() {
    super(Expense);
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
    const expense: Expense | any = await this.findById(id)

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
    const expense: Expense | any = await this.findById(id)

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
    const expense: Expense | any = await this.findById(id)

    if(!expense) {
      ThrowError.throwDatabaseError('No Expense found!')
    };

    if (expense && expense.userId != userId) {
      ThrowError.throwValidationError('Only the expense creator can delete it.')
    }

    return this.deleteById(id)
  }

}