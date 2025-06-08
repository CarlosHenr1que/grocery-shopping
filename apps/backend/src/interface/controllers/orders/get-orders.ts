import { GetOrders } from "../../../use-cases/get-orders";
import { Controller, HttpResponse } from "../../adapters/express-route-adapter";

export class GetOrdersController implements Controller {
  constructor(private readonly getOrders: GetOrders) {
    this.getOrders = getOrders;
  }

  async handle(): Promise<HttpResponse> {
    try {
      const orders = await this.getOrders.execute();
      return {
        statusCode: 200,
        body: orders,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
