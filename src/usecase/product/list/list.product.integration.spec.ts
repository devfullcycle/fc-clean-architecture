import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
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
    const usecase = new ListProductUseCase(productRepository);
    const product = ProductFactory.create("a", "PlayStation 5", 4999);

    const output = [
      {
        id: product.id,
        name: "PlayStation 5",
        price: 4999,
      },
    ];

    /* Act */
    await productRepository.create(product as Product);

    const result = await usecase.execute({});

    /* Assert */
    expect(result.products.length).toBe(1);
    expect(result.products[0].id).toBe(output[0].id);
    expect(result.products[0].name).toBe(output[0].name);
    expect(result.products[0].price).toBe(output[0].price);
  });

  it("should listing without product", async () => {
    /* Context */
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const output = { products: [] as object[] };

    /* Act */
    const result = await usecase.execute({});

    /* Assert */
    expect(result.products.length).toBe(0);
    expect(result).toEqual(output);
  });
});
