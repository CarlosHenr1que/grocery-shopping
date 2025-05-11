export class ProductNotFoundError extends Error {
  constructor() {
    super(`Provided product was not found.`);
    this.name = "ProductNotFound";
  }
}
