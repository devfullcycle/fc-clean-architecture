import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";
export default class UpdateProductUseCase {
  private ProductRepository: ProductRepositoryInterface;
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository;
  }

  async execute(
    input: InputUpdateProductDto
  ): Promise<OutputUpdateProductDto> {
    const product = await this.ProductRepository.find(input.id);
    product.changeName(input.name);
    
    await this.ProductRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }
}
