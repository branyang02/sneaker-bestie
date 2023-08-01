const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../check-auth"); // path to your middleware

const app = express();

app.use(authMiddleware);

app.get("/test-endpoint", (req, res) => {
  res.json({ data: "success" });
});

describe("Auth middleware", () => {
  test("responds with 401 if no authorization header", async () => {
    const response = await request(app).get("/test-endpoint");
    expect(response.statusCode).toBe(401);
  });

  test("responds with 403 if invalid token", async () => {
    const response = await request(app)
      .get("/test-endpoint")
      .set("Authorization", "Bearer invalidtoken");
    expect(response.statusCode).toBe(403);
  });

  test("responds with 200 if valid token", async () => {
    // Here you will have to create a valid JWT, replace 'user' with valid payload and 'secret' with your JWT secret
    const token = jwt.sign(
      { email: "admin@admin.com", userId: "64c8540373cd89d144af95ea" },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    const response = await request(app)
      .get("/test-endpoint")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
