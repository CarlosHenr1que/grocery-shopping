import { Document, ObjectId } from "mongodb";
import { ProductProps } from "../../../../core/entities/product";
import { OrderProps } from "../../../../core/entities/order";

export const mapToProducts = (documents: Document[]): ProductProps[] => {
  return documents.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    category: item.category,
    price: item.price,
    stock: item.stock,
    imageUrl: item.imageUrl,
  }));
};

export const mapToOrders = (documents: Document[]): OrderProps[] => {
  return documents.map((item) => ({
    id: item._id,
    userId: item.userId,
    items: item.items,
  }));
};

export const toObjectID = (id: string) => new ObjectId(id);
