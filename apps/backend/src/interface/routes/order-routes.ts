import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { OrderMongoRepository } from '../../infra/repositories/mongo/mongo-order-repository';
import { AddOrder } from '../../use-cases/add-order';
import { AddOrderController } from '../controllers/orders/add-order';
import { ProductsMongoRepository } from '../../infra/repositories/mongo/products/mongo-products-repository';
import { GetOrdersController } from '../controllers/orders/get-orders';
import { GetOrders } from '../../use-cases/get-orders';

const router = Router();

const orderRepository = new OrderMongoRepository();
const productsRepository = new ProductsMongoRepository();
const addOrder = new AddOrder(orderRepository, productsRepository);
const getOrders = new GetOrders(orderRepository);
const addOrderController = new AddOrderController(addOrder);
const getOrdersController = new GetOrdersController(getOrders);

router.post('/orders', adaptRoute(addOrderController));
router.get('/orders', adaptRoute(getOrdersController));

export { router as orderRouter };
