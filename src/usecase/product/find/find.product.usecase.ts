import type ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import {
  type InputFindProductDto,
  type OutputFindProductDto
} from './find.product.dto'

export default class FindProductUseCase {
  private readonly productRepository: ProductRepositoryInterface

  constructor (productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute (
    input: InputFindProductDto
  ): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.id)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
