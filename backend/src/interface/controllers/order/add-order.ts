import { AddOrder } from "../../../use-cases/add-order";
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
        return {
          statusCode: 400,
          body: {
            data: orderOrError.value.stock,
            message: orderOrError.value.error.name,
          },
        };
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
