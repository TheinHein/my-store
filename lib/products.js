import axios from "axios";

export async function getAllProductsIds() {
  const res = await axios.get("http://localhost:8080/api/products");
  const { products } = res.data;
  return products.map((p) => {
    return { params: { id: p._id } };
  });
}

export async function getProductData(id) {
  const res = await axios.get("http://localhost:8080/api/products");
  const { products } = res.data;
  return {
    id,
    ...products.filter((p) => p._id === id),
  };
}
