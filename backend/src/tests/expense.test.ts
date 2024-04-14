import databaseManager from '../db/database-manager';
import Expense from '../models/expense.model';
import TestClient from './util/test-client';

describe('Expense API', () => {
  let client = new TestClient();
  let expenseCreated: Expense;

  beforeAll(async () => {
    const db = databaseManager.getDatabaseTest();
    if (!db) {
      await databaseManager.initializeDatabase();
    }
  }, 4000);

  beforeEach(async () => {
    const loginDetails = {
      username: 'johndoe',
      password: '123'
    };

    await client.authenticate(loginDetails);
  });


  it('should list all expenses when authenticated', async () => {
    const response = await client.get('/api/expenses');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should list all expenses NOT AUTHENTICATED', async () => {
    const loginDetails = {
      username: 'janedoe',
      password: '123'
    };

    await client.authenticate(loginDetails);
    const response = await client.get('/api/expenses');
    expect(response.status).toBe(401);
    expect(response.body).not.toBeInstanceOf(Array);
  });

  it('should list all expenses by user', async () => {
    const response = await client.get('/api/expenses/allbyuser');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should create a new expense when authenticated', async () => {
    const newExpense = {
      description: 'New Laptop',
      date: '2024-01-01',
      value: 1500.00
    };

    const response = await client.post('/api/expenses', newExpense);
    expenseCreated = response.body
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
  
  it('should be an error when creating if the date is in the future', async () => {
    const today = new Date();
    const newExpense = {
      id: 99,
      description: 'New Laptop',
      date: today.setDate(today.getDate() + 2),
      value: '1500.00'
    };

    const response = await client.post('/api/expenses', newExpense);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });

  it('should give an error if the description is longer than 191 characters', async () => {
    const newExpense = {
      id: 100,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt tellus a urna eleifend elementum. Etiam et dolor nec enim hendrerit accumsan vitae et erat. Nulla lacinia vestibulum porttitor.',
      date: '2024-01-01',
      value: 1500.00
    };

    const response = await client.post('/api/expenses', newExpense);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });

  it('should get expense by id', async () => {
    const response = await client.get(`/api/expenses/adm/${expenseCreated.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should give an error by permission', async () => {
    const loginDetails = {
      username: 'janedoe',
      password: '123'
    };

    await client.authenticate(loginDetails);
    const response = await client.get(`/api/expenses/adm/${expenseCreated.id}`);
    expect(response.status).toBe(401);
    expect(response.body).not.toHaveProperty('id');
  });

  it('should give an error because is not a creator', async () => {
    const loginDetails = {
      username: 'janedoe',
      password: '123'
    };

    await client.authenticate(loginDetails);
    const response = await client.get(`/api/expenses/${expenseCreated.id}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should get expense by id', async () => {
    const response = await client.get(`/api/expenses/${expenseCreated.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should give an error by permission', async () => {
    const loginDetails = {
      username: 'janedoe',
      password: '123'
    };

    const expenseUpdate = {
      value: '100.00'
    } 

    await client.authenticate(loginDetails);
    const response = await client.put(`/api/expenses/adm/${expenseCreated.id}`, expenseUpdate);
    expect(response.status).toBe(401);
    expect(response.body).not.toEqual(1);
  });

  it('should edit the expense', async () => {
    const expenseUpdate = {
      value: '100.00'
    } 
    const response = await client.put(`/api/expenses/adm/${expenseCreated.id}`, expenseUpdate);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([1]);
  });

  it('should edit the expense', async () => {
    const expenseUpdate = {
      value: '150.00'
    } 
    const response = await client.put(`/api/expenses/${expenseCreated.id}`, expenseUpdate);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([1]);
  });

  it('should give an error because is not a creator', async () => {
    const loginDetails = {
      username: 'janedoe',
      password: '123'
    };

    const expenseUpdate = {
      value: '100.00'
    } 

    await client.authenticate(loginDetails);
    const response = await client.put(`/api/expenses/${expenseCreated.id}`, expenseUpdate);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  
  it('should give an error by permission', async () => {
    const loginDetails = {
      username: 'janedoe',
      password: '123'
    };

    await client.authenticate(loginDetails);
    const response = await client.delete(`/api/expenses/adm/${expenseCreated.id}`);
    expect(response.status).toBe(401);
    expect(response.body).not.toEqual(1);
  });

  it('should give an error because is not a creator', async () => {
    const loginDetails = {
      username: 'janedoe',
      password: '123' 
    };

    await client.authenticate(loginDetails);
    const response = await client.delete(`/api/expenses/${expenseCreated.id}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should delete the expense', async () => {
    const response = await client.delete(`/api/expenses/${expenseCreated.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([1]);
  });

});
