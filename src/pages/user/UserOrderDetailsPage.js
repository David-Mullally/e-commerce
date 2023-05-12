import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";
import { useSelector } from "react-redux";
import axios from "axios";
import { loadScript } from "@paypal/paypal-js";

const getOrder = async (orderId) => {
  const { data } = await axios.get(`/api/orders/user/${orderId}`);
  return data;
};

const UserOrderDetailsPage = () => {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const getUser = async () => {
    const { data } = await axios.get(`/api/users/profile/${userInfo._id}`);
    return data;
  };

  const loadPaypalScript = () => {
    loadScript({
      "client-id":
        "AQMw66B6UGy4bCdgiFkSBLpsasODCC0lEdUzyOMF8rNADaIcE_f_Ttpi-0oqoZp5BQsfyHDoiPMg5qLr",
    })
      .then((paypal) => {
        paypal
          .Buttons({
            createOrder: createPaypalOrderHandler,
            onCancel: onCancelHandler,
            onApprove: onApproveHandler,
            onError: onErrorHandler,
          })
          .render("#paypal-container-element");
      })
      .catch((err) => {
        console.error("Failed to load the Paypal JS SDK script", err);
      });
  };

  const createPaypalOrderHandler = function () {
    console.log("createPaypalOrderHandler");
  };

  const onCancelHandler = function () {
    console.log("onCancelHandler");
  };

  const onApproveHandler = function () {
    console.log("onApproveHandler");
  };
  const onErrorHandler = function (err) {
    console.log("onErrorHandler");
  };

  return (
    <UserOrderDetailsPageComponent
      userInfo={userInfo}
      getUser={getUser}
      getOrder={getOrder}
      loadPaypalScript={loadPaypalScript}
    />
  );
};

export default UserOrderDetailsPage;
