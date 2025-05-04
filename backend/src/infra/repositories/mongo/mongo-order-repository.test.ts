import { MongoHelper } from "./helpers/mongo-helper";
import { OrderMongoRepository } from "./mongo-order-repository";

const makeSut = () => {
  const sut = new OrderMongoRepository();
  return { sut };
};

const order = {
  id: "1",
  userId: "2",
  items: [
    {
      productId: "3",
      quantity: 2,
    },
    {
      productId: "2",
      quantity: 1,
    },
  ],
};

const mockInsertOne = {
  insertOne: jest.fn().mockReturnValue({
    insertedId: { toString: () => "1" },
  }),
} as never;

describe("Order mongo repository", () => {
  test("should return created order", async () => {
    const { sut } = makeSut();
    jest.spyOn(MongoHelper, "getCollection").mockReturnValueOnce(mockInsertOne);
    const response = await sut.create(order);

    expect(response).toStrictEqual(order);
  });

  test("should return product stock", async () => {
    const { sut } = makeSut();
    jest.spyOn(MongoHelper, "getCollection").mockReturnValueOnce(mockInsertOne);
    const response = await sut.create(order);

    expect(response).toStrictEqual(order);
  });
});
