import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
  });
  it("should throw an error when name is missing", async () => {
    const response = await request(app).post("/product").send({
      price: 100,
    });

    expect(response.status).toBe(501);
  });
});
