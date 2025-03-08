const request = require("supertest");
const app = require("../src/index");

describe("QuadTree API Tests", () => {
  test("Insert Point", async () => {
    const res = await request(app)
      .post("/api/quadTree/insert")
      .send({ x: 10, y: 20, data: "Test POI" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Point inserted successfully!");
  });

  test("Search Points", async () => {
    const res = await request(app).get("/api/quadTree/search?x=10&y=20&range=50");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.results)).toBe(true);
  });
});

