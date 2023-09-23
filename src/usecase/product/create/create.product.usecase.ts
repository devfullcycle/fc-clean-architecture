import type ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import {
  type InputCreateProductDto,
  type OutputCreateProductDto
} from './create.product.dto'
import ProductFactory from '../../../domain/product/factory/product.factory'
import Product from '../../../domain/product/entity/product'

export default class CreateProductUseCase {
  private readonly productRepository: ProductRepositoryInterface

  constructor (productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute (
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const productFactory = ProductFactory.create(
      input.type,
      input.name,
      input.price
    )

    const productEntity = new Product(productFactory.id, productFactory.name, productFactory.price)

    await this.productRepository.create(productEntity)

    return {
      id: productEntity.id,
      name: productEntity.name,
      price: productEntity.price
    }
  }
}
