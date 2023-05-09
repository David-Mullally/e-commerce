import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";
import { addToCart } from "../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ProductDetailsPage = () => {
  const products = useSelector((state) => state.cart.value)

  const dispatch = useDispatch();
  
  const addToCartHandler = () => {
    dispatch(addToCart());
  };

  return <ProductDetailsPageComponent addToCartHandler={addToCartHandler} products={products} />;
};

export default ProductDetailsPage;
