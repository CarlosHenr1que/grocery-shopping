import { ProductProps } from "../../../core/entities/product";
import { ProductsMongoRepository } from "../../../infra/repositories/mongo/products/mongo-products-repository";
import { GetProducts } from "../../../use-cases/get-products";
import { GetProductsController } from "./get-products";

const makeSut = () => {
  const productsRepository = new ProductsMongoRepository();
  const getProducts = new GetProducts(productsRepository);
  const sut = new GetProductsController(getProducts);
  return { sut, getProducts };
};

const products: ProductProps[] = [
  {
    id: "1",
    name: "any_name",
    category: "any_category",
    price: 0.99,
    stock: 25,
    imageUrl: "any_url",
  },
];

describe("Get products controller", () => {
  test("should return products", async () => {
    const { sut, getProducts } = makeSut();
    jest.spyOn(getProducts, `execute`).mockResolvedValue(products);

    const httpResponse = await sut.handle();
    expect(httpResponse.statusCode).toStrictEqual(200);
    expect(httpResponse.body).toStrictEqual(products);
  });

  test("should return return 500 when throwing an error", async () => {
    const { sut, getProducts } = makeSut();
    jest.spyOn(getProducts, `execute`).mockRejectedValue(new Error());

    const httpResponse = await sut.handle();
    expect(httpResponse.statusCode).toStrictEqual(500);
  });
});
