import ProductsPageComponent from "./components/ProductsPageComponenet";

import axios from "axios";

const fetchProducts = async(abortctrl) => {
  const { data } = await axios.get("/api/products/admin", {
    signal: abortctrl.signal,
  });
  return data;
}

const AdminProductsPage = () => {
  return <ProductsPageComponent fetchProducts={fetchProducts} />
};

export default AdminProductsPage;
