const request = require('supertest');
const app = require('../app');

describe('Auth Tests', () => {
  test('Route /login exists', async () => {
    const response = await request(app).get('/login');
    expect(response.statusCode).not.toBe(404);
  });

  test('Route /logout exists', async () => {
    const response = await request(app).post('/logout');
    expect(response.statusCode).not.toBe(404);
  });

  test('Route /logout unauthenticated returns 403', async () => {
    const response = await request(app).post('/logout');
    expect(response.statusCode).toBe(403);
  });
});
