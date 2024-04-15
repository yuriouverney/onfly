import request from 'supertest';
import api from '../../api';

export interface ICredentials {
  username: string;
  password: string;
}

class TestClient {
  static api = api;
  token: string | null;

  constructor() {
    this.token = null;
  }

  setToken(token: string) {
    this.token = token;
  }

  async authenticate(credentials: ICredentials) {
    const res = await request(api).post('/api/auth/login').send(credentials);
    this.token = res.body.access_token;
    return res;
  }

  async get(url: string) {
    return request(TestClient.api).get(url).set('Authorization', `Bearer ${this.token}`);
  }

  async post(url: string, body: any) {
    return request(TestClient.api).post(url).send(body).set('Authorization', `Bearer ${this.token}`);
  }

  async put(url: string, body: any) {
    return request(TestClient.api).put(url).send(body).set('Authorization', `Bearer ${this.token}`);
  }

  async delete(url: string) {
    return request(TestClient.api).delete(url).set('Authorization', `Bearer ${this.token}`);
  }
}

export default TestClient;
