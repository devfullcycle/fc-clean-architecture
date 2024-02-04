import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

const product = new Product("123", "Geo", 25.0);

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("Unit test for product usecase", () => {
    it("Should find a product", async () => {
        const productRepository = MockRepository();
        const productFindUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "123"
        }

        const result = await productFindUseCase.execute(input);

        const output = {
            id: "123",
            name: "Geo",
            price: 25.0
        }

        expect(result).toEqual(output)
    })
});