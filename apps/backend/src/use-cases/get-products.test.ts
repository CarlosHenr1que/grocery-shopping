import { ProductProps } from "../core/entities/product";
import { ProductsMongoRepository } from "../infra/repositories/mongo/products/mongo-products-repository";
import { GetProducts } from "./get-products";

const makeSut = () => {
  const productsRepository = new ProductsMongoRepository();
  const sut = new GetProducts(productsRepository);
  return { sut, productsRepository };
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

describe(`Get products use case`, () => {
  test("should return products ", async () => {
    const { sut, productsRepository } = makeSut();
    jest.spyOn(productsRepository, "findAll").mockResolvedValueOnce(products);
    const response = await sut.execute();

    expect(response).toStrictEqual(products);
  });
});
