import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import UpdateProductUseCase from "./update.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration test for product update use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const product = new Product("123", "Xpto", 25.32);

        const input = {
            id: product.id,
            name: "Product Updated",
            price: 110.67
        };

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});
