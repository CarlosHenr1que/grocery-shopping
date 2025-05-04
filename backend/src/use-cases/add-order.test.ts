import OrderBuilder from "../../mocks/data/order";
import ProductBuilder from "../../mocks/data/product";
import { OrderProps } from "../core/entities/order";
import { Product } from "../core/entities/product";
import { OrderMongoRepository } from "../infra/repositories/mongo/mongo-order-repository";
import { ProductsMongoRepository } from "../infra/repositories/mongo/mongo-products-repository";
import { AddOrder } from "./add-order";
import { UnavailableStockError } from "./erros/unavailable-stock";

const makeSut = () => {
  const orderRepository = new OrderMongoRepository();
  const productsRepository = new ProductsMongoRepository();
  const sut = new AddOrder(orderRepository, productsRepository);
  return { sut, orderRepository, productsRepository };
};

const order: OrderProps = {
  id: "1",
  userId: "1",
  items: [
    {
      productId: "3",
      quantity: 2,
    },
  ],
};

describe(`Add order use case`, () => {
  test("should create an order given proper attributes ", async () => {
    const { sut, orderRepository, productsRepository } = makeSut();
    const orderMock = new OrderBuilder().build();
    const productMock = new ProductBuilder().build();
    jest.spyOn(orderRepository, "create").mockResolvedValueOnce(orderMock);
    jest
      .spyOn(productsRepository, "findStock")
      .mockResolvedValueOnce([productMock]);
    const response = await sut.execute(orderMock);

    expect(response.value).toStrictEqual(orderMock);
  });

  test("should return unavailable stock given a order with out of stock product", async () => {
    const { sut, orderRepository, productsRepository } = makeSut();
    const productMock = new ProductBuilder().build();
    const orderMock = new OrderBuilder()
      .setItems([
        { productId: productMock.id, quantity: productMock.stock + 1 },
      ])
      .build();

    jest.spyOn(orderRepository, "create").mockResolvedValueOnce(orderMock);
    jest
      .spyOn(productsRepository, "findStock")
      .mockResolvedValueOnce([
        { id: productMock.id, stock: productMock.stock },
      ]);
    const response = await sut.execute(orderMock);

    expect(response.value).toStrictEqual({
      error: new UnavailableStockError(),
      stock: [
        {
          id: productMock.id,
          stock: productMock.stock,
          quantity: productMock.stock + 1,
        },
      ],
    });
  });
});
