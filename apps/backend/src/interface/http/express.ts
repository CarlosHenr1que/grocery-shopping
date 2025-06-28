import express from 'express';
import cors from 'cors';

import { productsRouter } from '../routes/products-routes';
import { orderRouter } from '../routes/order-routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(productsRouter);
app.use(orderRouter);

export default app;
