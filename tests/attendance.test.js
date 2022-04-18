const request = require('supertest');
const app = require('../app');

describe('Attendance Tests', () => {
  test('Route / exists', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).not.toBe(404);
  });

  test('Route / redirect to /login on unauthenticated', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(302);
  });

  test('POST / exists', async () => {
    const response = await request(app).post('/');
    expect(response.statusCode).not.toBe(404);
  });

  test('POST / unauthenticated to 403', async () => {
    const response = await request(app).post('/');
    expect(response.statusCode).toBe(403);
  });
});
