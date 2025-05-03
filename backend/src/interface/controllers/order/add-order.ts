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
      const order = await this.addOrder.execute(httpRequest.body);
      return {
        statusCode: 201,
        body: order,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
