const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("Auth API", () => {
  // Clean users collection before each test
  beforeEach(async () => {
    await User.deleteMany();
  });

  test("should register a new user and return a token", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ronaldo",
        email: "ronaldo@example.com",
        password: "pass123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });
  test("should require email during registration", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Test User",
      password: "123456", // missing email
    });

  expect(res.statusCode).toBe(400);
});

  test("should log in an existing user", async () => {
    // First register a user
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ronaldo",
        email: "ronaldo@example.com",
        password: "pass123",
      });

    // Then try logging in
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "ronaldo@example.com",
        password: "pass123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
