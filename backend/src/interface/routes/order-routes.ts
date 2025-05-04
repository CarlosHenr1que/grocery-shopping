import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { OrderMongoRepository } from "../../infra/repositories/mongo/mongo-order-repository";
import { AddOrder } from "../../use-cases/add-order";
import { AddOrderController } from "../controllers/order/add-order";
import { ProductsMongoRepository } from "../../infra/repositories/mongo/mongo-products-repository";
const router = Router();

const orderRepository = new OrderMongoRepository();
const productsRepository = new ProductsMongoRepository();
const addOrder = new AddOrder(orderRepository, productsRepository);
const addOrderController = new AddOrderController(addOrder);
router.post("/order", adaptRoute(addOrderController));
export { router as orderRouter };
