import axios from 'axios';
import { Product } from '../models/Product';

const http = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getProductsRequest = async (): Promise<Product[] | undefined> => {
  try {
    const response = await http.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return undefined;
};
