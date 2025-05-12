import { ObjectId } from "mongodb";
import { MongoHelper } from "../helpers/mongo-helper";
import { ProductsMongoRepository } from "./mongo-products-repository";

const makeSut = () => {
  const sut = new ProductsMongoRepository();
  return { sut };
};

const products = [
  {
    id: "680677cd575c799fe3d861e0",
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
      _id: { toString: () => "680677cd575c799fe3d861e0" },
      name: "any_name",
      category: "any_category",
      price: 0.99,
      stock: 25,
      imageUrl: "any_url",
    },
  ]),
});

const mockBulkWrite = jest.fn().mockReturnValue({
  toArray: jest.fn().mockResolvedValue(null),
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

  test("should return products stock given an order", async () => {
    const { sut } = makeSut();
    jest.spyOn(MongoHelper, "getCollection").mockReturnValueOnce({
      find: mockFind,
    } as never);

    const response = await sut.findAllById([]);

    expect(response).toStrictEqual(products);
  });

  test("should update product stock with correct params", async () => {
    const { sut } = makeSut();
    jest.spyOn(MongoHelper, "getCollection").mockReturnValueOnce({
      bulkWrite: mockBulkWrite,
    } as never);

    const [product] = products;
    const items = [{ id: product.id, quantity: 2 }];
    await sut.updateStock(items);

    expect(mockBulkWrite).toHaveBeenCalledWith([
      {
        updateOne: {
          filter: { _id: new ObjectId(items[0].id) },
          update: { $inc: { stock: -items[0].quantity } },
        },
      },
    ]);
  });
});
