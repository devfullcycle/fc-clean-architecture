import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "a",
    name: "product_test",
    price: 25.0
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    }
}

describe("Unit test for product usecase", () => {
    it("Should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual(
            {
                id: expect.any(String),
                name: input.name,
                price: input.price
            }
        )
    })
});