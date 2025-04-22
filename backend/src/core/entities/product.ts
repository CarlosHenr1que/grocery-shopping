export interface ProductProps {
  id?: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export class Product {
  public readonly id: string | undefined;
  public readonly name: string;
  public readonly category: string;
  public readonly price: number;
  public readonly stock: number;
  public readonly imageUrl: string;

  private constructor(
    id: string | undefined,
    name: string,
    category: string,
    price: number,
    stock: number,
    imageUrl: string,
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.stock = stock;
    this.imageUrl = imageUrl;
    Object.freeze(this);
  }

  static create(props: ProductProps) {
    return new Product(
      props.id,
      props.name,
      props.category,
      props.price,
      props.stock,
      props.imageUrl,
    );
  }
}
