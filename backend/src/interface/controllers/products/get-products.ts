import { GetProducts } from "../../../use-cases/get-products";
import { Controller } from "../../adapters/express-route-adapter";

export class GetProductsController implements Controller {
  constructor(private getProducts: GetProducts) {
    this.getProducts = getProducts;
  }

  async handle() {
    try {
      const products = await this.getProducts.execute();
      return {
        statusCode: 200,
        body: products,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Server error",
      };
    }
  }
}
