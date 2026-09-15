import { products as productSeed } from "../data/products";
import type { Product, ProductSearch } from "../types/product";

export interface ProductService {
  getAllProducts(): Product[];
  getProductById(id: string): Product | undefined;
  searchProducts(query: string): Product[];
}

class LocalProductService implements ProductService {
  getAllProducts(): Product[] {
    return productSeed;
  }

  getProductById(id: string): Product | undefined {
    return productSeed.find((product) => product.id === id);
  }

  searchProducts(query: string): Product[] {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return productSeed;
    }

    return productSeed.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalized) ||
        product.brand.toLowerCase().includes(normalized) ||
        product.shortName.toLowerCase().includes(normalized) ||
        product.strap.toLowerCase().includes(normalized) ||
        product.color.toLowerCase().includes(normalized)
      );
    });
  }
}

export const productService = new LocalProductService();

export const normalizeProductPrice = (price: string | number): number => {
  if (typeof price === "number") {
    return price;
  }

  const parsed = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

export const formatMoney = (value: number): string => {
  return `$${value.toFixed(2)}`;
};

export const mapProductToProductSearch = (product: Product): ProductSearch => ({
  id: product.id,
  name: product.name,
  brand: product.brand,
  shortName: product.shortName,
  price: product.price,
  image: product.image,
  color: product.color,
  strap: product.strap,
  warranty: product.warranty,
  specs: product.specs,
});
