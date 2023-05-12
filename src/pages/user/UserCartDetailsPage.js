import UserCartDetailsPageComponent from "./components/UserCartDetailsPageComponent";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import axios from "axios";

const UserCartDetailsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const dispatch = useDispatch();
  const getUser = async () => {
    const { data } = await axios.get(`/api/users/profile/${userInfo._id}`);
    return data;
  };

  const createOrder = async (orderData) => {
    const { data } = await axios("/api/orders", { ...orderData });
    return data;
  };
  return (
    <UserCartDetailsPageComponent
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      cartItems={cartItems}
      itemsCount={itemsCount}
      cartSubtotal={cartSubtotal}
      reduxDispatch={dispatch}
      userInfo={userInfo}
      getUser={getUser}
      createOrder={createOrder}
    />
  );
};

export default UserCartDetailsPage;
