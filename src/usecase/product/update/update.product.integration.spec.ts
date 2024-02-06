import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { inputProduct1, product1 } from "../mock";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

const inputUpdate = {
  id: inputProduct1.id,
  name: "Product 1 Updated",
  price: 100,
};

describe("Unit test for product update use case", () => {
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
    const productRepository = new ProductRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    await productRepository.create(product1);

    const output = await productUpdateUseCase.execute(inputUpdate);

    expect(output).toEqual(inputUpdate);
  });
});
