import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "../find/find.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
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

  it("should update a product", async () => {
    /* Context */
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);
    const product = ProductFactory.create("a", "Xbox Series S", 2700);
    const input = {
      id: product.id,
      name: "Xbox Series S",
      price: 2700,
    };

    /* Act */
    productRepository.create(product as Product);

    const output = await usecase.execute(input);

    /* Assert */
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when price be less than zero", async () => {
    /* Context */
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);
    const product = ProductFactory.create("a", "Xbox Series S", 2700);
    const input = {
      id: product.id,
      name: "Xbox Series S",
      price: -2700,
    };

    /* Act */
    productRepository.create(product as Product);

    /* Assert */
    await expect(usecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
