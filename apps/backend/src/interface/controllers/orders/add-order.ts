import { AddOrder } from "../../../use-cases/add-order";
import { ProductNotFoundError } from "../../../use-cases/erros/product-not-found";
import { UnavailableStockError } from "../../../use-cases/erros/unavailable-stock";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../adapters/express-route-adapter";

export class AddOrderController implements Controller {
  constructor(private readonly addOrder: AddOrder) {
    this.addOrder = addOrder;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const orderOrError = await this.addOrder.execute(httpRequest.body);
      if (orderOrError.isLeft()) {
        const error = orderOrError.value.error;
        if (error instanceof UnavailableStockError) {
          return {
            statusCode: 400,
            body: {
              data: orderOrError.value.stock,
              message: error.message,
            },
          };
        }

        if (error instanceof ProductNotFoundError) {
          return {
            statusCode: 400,
            body: {
              message: error.message,
            },
          };
        }
      }

      return {
        statusCode: 201,
        body: orderOrError.value,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
