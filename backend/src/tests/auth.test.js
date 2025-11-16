const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth API', () => {
  beforeEach(async () => await User.deleteMany());

  test('register a new user and returns token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Ronaldo',
        email: 'ronaldo@example.com',
        password: 'pass123'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test('logs in an existing user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Ronaldo',
        email: 'ronaldo@example.com',
        password: 'pass123'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'ronaldo@example.com',
        password: 'pass123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
