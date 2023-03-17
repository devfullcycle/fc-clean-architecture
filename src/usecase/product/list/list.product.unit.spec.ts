import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "PlayStation 5", 4999);
const product2 = ProductFactory.create("a", "Xbox Series S", 2700);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("Unit Test for listing product use case", () => {
  it("should list a product", async () => {
    /* Context */
    const productRepository = MockRepository();
    const useCase = new ListProductUseCase(productRepository);

    /* Act */
    const output = await useCase.execute({});

    /* Assert */
    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });

  it("should listing without product", async () => {
    /* Context */
    const productRepository = MockRepository();
    productRepository.findAll.mockReturnValue([]);
    const useCase = new ListProductUseCase(productRepository);

    /* Act */
    const output = await useCase.execute({});

    /* Assert */
    expect(output.products.length).toBe(0);
  });
});
