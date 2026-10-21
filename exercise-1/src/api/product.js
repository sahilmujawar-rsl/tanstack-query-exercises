export default async function fetchProducts({ search }) {
  const url = search
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}`
    : "https://dummyjson.com/products";

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const { products } = await res.json();
  return products;
}
