import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "../find/find.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";
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

  it("should list any product", async () => {
    const productRepository = new ProductRepository();
    const productA = new Product("1", "Product 1", 100);
    const productB = new Product("1", "Product 2", 200);

    const create = new CreateProductUseCase(productRepository);
    const productCreatedA = await create.execute(productA);
    const productCreatedB = await create.execute(productB);
    

    const productFindUseCaseA = await new ListProductUseCase(productRepository).execute(productCreatedA)
    
    expect(productFindUseCaseA.products[0].price).toBe(productA.price);
    expect(productFindUseCaseA.products[0].name).toBe(productA.name);
    expect(productFindUseCaseA.products[1].price).toBe(productCreatedB.price);
    expect(productFindUseCaseA.products[1].name).toBe(productCreatedB.name);
  });
});