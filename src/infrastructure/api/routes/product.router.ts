import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import { OutputFindProductDto } from "../../../usecase/product/find/find.product.dto";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRouter = express.Router();

productRouter.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());

  try {
    const product = {
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(product);

    res.status(200).send(output);
  } catch (err) {
    res.status(501).send(err);
  }
});

productRouter.get("/:id", async (req: Request, res: Response) => {
  const InputFindProductDto = { id: req.params.id };

  const usecase = new FindProductUseCase(new ProductRepository());

  const output: OutputFindProductDto = await usecase.execute(
    InputFindProductDto
  );

  res.status(200).send(output);
});
