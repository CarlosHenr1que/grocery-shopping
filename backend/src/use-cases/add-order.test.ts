import OrderBuilder from "../../mocks/data/order";
import ProductBuilder from "../../mocks/data/product";
import { OrderMongoRepository } from "../infra/repositories/mongo/mongo-order-repository";
import { ProductsMongoRepository } from "../infra/repositories/mongo/products/mongo-products-repository";
import { AddOrder } from "./add-order";
import { ProductNotFoundError } from "./erros/product-not-found";
import { UnavailableStockError } from "./erros/unavailable-stock";

const makeSut = () => {
  const orderRepository = new OrderMongoRepository();
  const productsRepository = new ProductsMongoRepository();
  const sut = new AddOrder(orderRepository, productsRepository);
  return { sut, orderRepository, productsRepository };
};

describe(`Add order use case`, () => {
  test("should create an order given proper attributes ", async () => {
    const { sut, orderRepository, productsRepository } = makeSut();
    const orderMock = new OrderBuilder().build();
    const productMock = new ProductBuilder().build();
    jest.spyOn(productsRepository, "updateStock").mockResolvedValueOnce();
    jest.spyOn(orderRepository, "create").mockResolvedValueOnce(orderMock);
    jest
      .spyOn(productsRepository, "findAllById")
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
      .spyOn(productsRepository, "findAllById")
      .mockResolvedValueOnce([productMock]);
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

  test("should return product not found error when given product does not exist", async () => {
    const { sut, orderRepository, productsRepository } = makeSut();
    const productMock = new ProductBuilder().build();
    const orderMock = new OrderBuilder()
      .setItems([
        { productId: productMock.id, quantity: productMock.stock + 1 },
      ])
      .build();

    jest.spyOn(orderRepository, "create").mockResolvedValueOnce(orderMock);
    jest.spyOn(productsRepository, "findAllById").mockResolvedValueOnce([]);

    const response = await sut.execute(orderMock);

    expect(response.value).toStrictEqual({
      error: new ProductNotFoundError(),
    });
  });
});
