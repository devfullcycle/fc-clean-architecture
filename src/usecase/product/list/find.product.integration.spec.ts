import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product1 = new Product('1', 'Product 1', 100)
    await productRepository.create(product1);

    const product2 = new Product('2', 'Product 2', 200)
    await productRepository.create(product2);

    const output = await usecase.execute({});

    expect(output.product.length).toBe(2);
    expect(output.product[0].id).toBe(product1.id);
    expect(output.product[0].name).toBe(product1.name);
    expect(output.product[0].price).toBe(product1.price);
    expect(output.product[1].id).toBe(product2.id);
    expect(output.product[1].name).toBe(product2.name);
    expect(output.product[1].price).toBe(product2.price);

  });
});
