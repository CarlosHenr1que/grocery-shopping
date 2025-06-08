export class UnavailableStockError extends Error {
  constructor() {
    super(`Some products are out of stock.`);
    this.name = "UnavailableStockError";
  }
}
