import { MongoHelper } from "./helpers/mongo-helper";
import { ProductsMongoRepository } from "./mongo-products-repository";

const makeSut = () => {
  const sut = new ProductsMongoRepository();
  return { sut };
};

const products = [
  {
    id: "1",
    name: "any_name",
    category: "any_category",
    price: 0.99,
    stock: 25,
    imageUrl: "any_url",
  },
];

const mockFind = jest.fn().mockReturnValue({
  toArray: jest.fn().mockResolvedValue([
    {
      _id: { toString: () => "1" },
      name: "any_name",
      category: "any_category",
      price: 0.99,
      stock: 25,
      imageUrl: "any_url",
    },
  ]),
});

describe("Products mongo repository", () => {
  test("should return products", async () => {
    const { sut } = makeSut();
    jest.spyOn(MongoHelper, "getCollection").mockReturnValueOnce({
      find: mockFind,
    } as never);
    const response = await sut.findAll();

    expect(response).toStrictEqual(products);
  });
});
