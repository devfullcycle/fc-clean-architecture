import { app, sequelize } from "../express";
import request from "supertest";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";

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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const listUseCase = new CreateProductUseCase(productRepository);

    const input = { name: "Product 1", price: 100 };

    const output = await listUseCase.execute(input);

    const response = await await request(app).get(`/product/${output.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(output.id);
    expect(response.body.name).toBe(output.name);
    expect(response.body.price).toBe(output.price);
  });
});
