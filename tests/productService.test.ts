import assert from "node:assert/strict";
import { normalizeProductPrice, productService } from "../src/services/productService";
import profileReducer, { setProfile } from "../src/store/slices/profileSlice";

const products = productService.getAllProducts();
assert.ok(products.length >= 1, "seed products exist");

const item = productService.getProductById(products[0].id);
assert.ok(item, "product lookup returns an existing item");

const search = productService.searchProducts("Bremont");
assert.ok(search.length >= 1, "search finds brand or name");
assert.ok(search.some((product) => product.brand.toLowerCase().includes("bremont")), "search returns a matching bremont product");

const price = normalizeProductPrice("$250");
assert.equal(price, 250, "price normalization keeps the numeric value");

const nextProfile = profileReducer(undefined, setProfile({
  fullName: "Alice Walker",
  email: "alice@example.com",
  phone: "+1 234 567 890",
}));

assert.equal(nextProfile.fullName, "Alice Walker", "profile reducer stores the updated fullName");

console.log("product service smoke tests passed");
