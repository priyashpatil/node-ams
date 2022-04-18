const request = require('supertest');
const app = require('../app');

describe('Admin Tests', () => {
  test('Route /admin exists', async () => {
    const response = await request(app).get('/admin');
    expect(response.statusCode).not.toBe(404);
  });

  test('Route /admin redirect to /login on unauthenticated', async () => {
    const response = await request(app).get('/admin');
    expect(response.statusCode).toBe(302);
  });

  test('Route /admin/employees exists', async () => {
    const response = await request(app).get('/admin/employees');
    expect(response.statusCode).not.toBe(404);
  });

  test('Route /admin/employees unatuhtentcated redirects to /login', async () => {
    const response = await request(app).get('/admin/employees');
    expect(response.statusCode).toBe(302);
  });

  test('POST /admin/employees exists', async () => {
    const response = await request(app).post('/admin/employees');
    expect(response.statusCode).not.toBe(404);
  });

  test('POST /admin/employees unatuhtentcated returns 403', async () => {
    const response = await request(app).post('/admin/employees');
    expect(response.statusCode).toBe(403);
  });

  test('Route /admin/employees/add exists', async () => {
    const response = await request(app).get('/admin/employees/add');
    expect(response.statusCode).not.toBe(404);
  });

  test('Route /admin/employees/add unatuhtentcated redirects to /login', async () => {
    const response = await request(app).get('/admin/employees/add');
    expect(response.statusCode).toBe(302);
  });

  test('Route /admin/employees/123 with params exists', async () => {
    const response = await request(app).get('/admin/employees/1234');
    expect(response.statusCode).not.toBe(404);
  });

  test('Route /admin/employees/1234 with params unatuhtentcated redirects to /login', async () => {
    const response = await request(app).get('/admin/employees/1234');
    expect(response.statusCode).toBe(302);
  });

  test('POST /admin/employees/update/123 with params exists', async () => {
    const response = await request(app).post('/admin/employees/update/1234');
    expect(response.statusCode).not.toBe(404);
  });

  test('POST /admin/employees/1234 with params unatuhtentcated return 403', async () => {
    const response = await request(app).post('/admin/employees/update/1234');
    expect(response.statusCode).toBe(403);
  });

  test('POST /admin/employees/delete/123 with params exists', async () => {
    const response = await request(app).post('/admin/employees/delete/1234');
    expect(response.statusCode).not.toBe(404);
  });

  test('POST /admin/employees/delete with params unatuhtentcated return 403', async () => {
    const response = await request(app).post('/admin/employees/delete/1234');
    expect(response.statusCode).toBe(403);
  });
});
