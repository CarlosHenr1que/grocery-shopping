import { Router } from "express";
import { GetProductsController } from "../controllers/products/get-products";
import { GetProducts } from "../../use-cases/get-products";
import { ProductsMongoRepository } from "../../infra/repositories/mongo/products/mongo-products-repository";
import { adaptRoute } from "../adapters/express-route-adapter";
const router = Router();

const getProductsRepository = new ProductsMongoRepository();
const getProducts = new GetProducts(getProductsRepository);
const getProductsController = new GetProductsController(getProducts);

router.get("/products", adaptRoute(getProductsController));
export { router as productsRouter };
