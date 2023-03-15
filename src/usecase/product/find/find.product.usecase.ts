import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
  private productRepositoy: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepositoy = productRepository;
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepositoy.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
