const request = require('supertest');
const app = require('../app');
const Sweet = require('../models/Sweet');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const getToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

describe('Sweets API', () => {
  let userToken, adminToken, sweet;

  beforeAll(async () => {
    await User.deleteMany();
    await Sweet.deleteMany();
    const user = await User.create({ name: 'User', email: 'u@test.com', password: '123456' });
    const admin = await User.create({ name: 'Admin', email: 'a@test.com', password: '123456', role: 'admin' });
    userToken = getToken(user);
    adminToken = getToken(admin);
    sweet = await Sweet.create({ name: 'Ladoo', category: 'Indian', price: 10, quantity: 5 });
  });

  test('user can view sweets', async () => {
    const res = await request(app)
      .get('/api/sweets')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('user can purchase a sweet', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBeLessThan(5);
  });

  test('admin can restock sweets', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/restock`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ quantity: 10 });
    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBeGreaterThan(5);
  });
});
