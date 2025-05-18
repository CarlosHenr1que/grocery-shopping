import { GetOrders } from "../../../use-cases/get-orders";
import { GetOrdersController } from "./get-orders";
import { OrderMongoRepository } from "../../../infra/repositories/mongo/mongo-order-repository";
import OrderBuilder from "../../../../mocks/data/order";

const makeSut = () => {
  const orderRepository = new OrderMongoRepository();
  const getOrders = new GetOrders(orderRepository);
  const sut = new GetOrdersController(getOrders);
  return { sut, getOrders, orderRepository };
};
describe("Get orders controller", () => {
  it("should return 200 with current orders", async () => {
    const order = new OrderBuilder().build();
    const { sut, getOrders } = makeSut();
    jest.spyOn(getOrders, "execute").mockResolvedValueOnce([order]);
    const response = await sut.handle();
    expect(response).toStrictEqual({
      statusCode: 200,
      body: [order],
    });
  });

  it("should return 500 if throw error", async () => {
    const { sut, getOrders } = makeSut();
    jest.spyOn(getOrders, "execute").mockRejectedValueOnce(new Error());
    const response = await sut.handle();
    expect(response).toStrictEqual({
      statusCode: 500,
      body: new Error(),
    });
  });
});
