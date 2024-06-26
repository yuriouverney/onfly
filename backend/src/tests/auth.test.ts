import databaseManager from '../db/database-manager';
import TestClient from './util/test-client'; // Adjust the import path

describe('Authentication API', () => {
  const client = new TestClient();

  beforeAll(async () => {
    const db = databaseManager.getDatabaseTest();
    if (!db) {
      await databaseManager.initializeDatabase();
    }
  }, 4000);

  describe('POST /auth/login', () => {
    it('should authenticate user and return a token', async () => {
      const userDetails = {
        username: 'johndoe',
        password: '123',
      };

      const response = await client.authenticate(userDetails);
      expect(response.body.access_token).toBeDefined();
    });

    it('should fail with incorrect credentials', async () => {
      const wrongDetails = {
        username: 'wronguser',
        password: 'wrongpass',
      };

      const response = await client.authenticate(wrongDetails);
      expect(response.status).toBe(401);
      expect(response.body).not.toHaveProperty('access_token');
    });
  });
});
