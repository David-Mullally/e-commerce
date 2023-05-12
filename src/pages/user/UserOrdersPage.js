import UserOrdersPageComponent from "./components/UserOrdersPageComponent";
import axios from 'axios';


const getOrders = async () => {
  const { data } = await axios.get("/api/orders");
  return data
}


const UserOrders = () => {
  return <UserOrdersPageComponent getOrders={getOrders} />
};

export default UserOrders;
