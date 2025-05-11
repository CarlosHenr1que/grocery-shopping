import { Document, ObjectId } from "mongodb";
import { ProductProps } from "../../../../core/entities/product";

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

export const toObjectID = (id: string) => new ObjectId(id);
