import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Book",
                price: 25.0,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Book");
        expect(response.body.price).toBe(25.0);
    });

    it("should not create a product", async () => {
        const response = await request(app).post("/product").send({
            type: "a",
        });
        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Book",
                price: 25.0,
            });

        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Cellphone",
                price: 400.0,
            });

        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const product = listResponse.body.products[0];
        expect(product.name).toBe("Book");
        expect(product.price).toBe(25.0);

        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Cellphone");
        expect(product2.price).toBe(400.0);

        const listResponseXML = await request(app)
            .get("/product")
            .set("Accept", "application/xml")
            .send();

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<products>`);
        expect(listResponseXML.text).toContain(`<product>`);
        expect(listResponseXML.text).toContain(`<name>Book</name>`);
        expect(listResponseXML.text).toContain(`<price>25</price>`);
        expect(listResponseXML.text).toContain(`</product>`);
        expect(listResponseXML.text).toContain(`<name>Cellphone</name>`);
        expect(listResponseXML.text).toContain(`<price>400</price>`);
        expect(listResponseXML.text).toContain(`</products>`);

    });

    it("should retrieve a specific product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Book",
                price: 25.0,
            });

        expect(response.status).toBe(200);

        const findResponse = await request(app).get(`/product/${response.body.id}`).send();

        expect(findResponse.status).toBe(200);
        expect(findResponse.body.id).toBe(response.body.id);
        expect(findResponse.body.name).toBe(response.body.name);
        expect(findResponse.body.price).toBe(response.body.price);

    });

    it("should not return a specific product", async () => {
        const response = await request(app).get("/product/123").send();
        expect(response.status).toBe(500);
    });

    it("should update product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Book",
                price: 25.0,
            });

        expect(response.status).toBe(200);

        const updateResponse = await request(app).put(`/product/${response.body.id}`).send({ name: "Book updated", price: 20.5 });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.id).toBe(response.body.id);
        expect(updateResponse.body.name).toBe("Book updated");
        expect(updateResponse.body.price).toBe(20.5);

    });

    it("should not update a product", async () => {
        const response = await request(app).put("/product/123").send({});
        expect(response.status).toBe(500);
    });
});
