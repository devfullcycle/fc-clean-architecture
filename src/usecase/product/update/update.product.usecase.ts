import type ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import {
  type InputUpdateProductDto,
  type OutputUpdateProductDto
} from './update.product.dto'

export default class UpdateProductUseCase {
  private readonly ProductRepository: ProductRepositoryInterface
  constructor (ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository
  }

  async execute (
    input: InputUpdateProductDto
  ): Promise<OutputUpdateProductDto> {
    const product = await this.ProductRepository.find(input.id)
    product.changeName(input.name)
    product.changePrice(input.price)

    await this.ProductRepository.update(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
