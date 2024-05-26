import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "a",
    name: "xpto",
    price: 12.55
  };

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

describe("Unit test product customer use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    });

    it("should thrown an error when type is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        
        input.type = "";
        
        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Product type not supported"
          );
    })
});