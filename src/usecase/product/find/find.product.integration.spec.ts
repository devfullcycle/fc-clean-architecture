import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

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
    /* Context */
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);
    const product = new Product("999", "Xbox Series X", 2700);
    const input = {
      id: "999",
    };
    const output = {
      id: "999",
      name: "Xbox Series X",
      price: 2700,
    };

    /* Act */
    await productRepository.create(product);
    const result = await usecase.execute(input);

    /* Assert */
    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    /* Context */
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);
    const input = { id: "991" };

    /* Assert */
    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
