import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ProductPresenter from "../presenters/product.presenter";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());
    try {
        const productDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price
        };
        const output = await usecase.execute(productDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    const output = await usecase.execute({});

    res.format({
        json: async () => res.send(output),
        xml: async () => res.send(ProductPresenter.listXML(output)),
    });
});

productRoute.get("/:id", async (req: Request, res: Response) => {
    const usecase = new FindProductUseCase(new ProductRepository());
    try {
        const output = await usecase.execute({ id: req.params.id });
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});


productRoute.put("/:id", async (req: Request, res: Response) => {
    const usecase = new UpdateProductUseCase(new ProductRepository());
    try {
        const updateProductDto = {
            id: req.params.id,
            name: req.body.name,
            price: req.body.price
        };
        const output = await usecase.execute(updateProductDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});