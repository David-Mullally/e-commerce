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

  const loadPaypalScript = (cartSubtotal, cartItems) => {
    loadScript({
      "client-id":
        "AQMw66B6UGy4bCdgiFkSBLpsasODCC0lEdUzyOMF8rNADaIcE_f_Ttpi-0oqoZp5BQsfyHDoiPMg5qLr",
    })
      .then((paypal) => {
        paypal
          .Buttons(buttons(cartSubtotal, cartItems))
          .render("#paypal-container-element");
      })
      .catch((err) => {
        console.error("Failed to load the Paypal JS SDK script", err);
      });
  };

  const buttons = (cartSubtotal, cartItems) => {
    return {
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: cartSubtotal,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: cartSubtotal,
                  }
                }
              },
              items: cartItems.map(product => {
                return {
                  name: product.name,
                  unit_amount: {
                    currency_code: "USD",
                    value: product.price
                  },
                  quantity: product.quantity,
                }
              })
            },
          ],
        });
      },
      onCancel: onCancelHandler,
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (orderData) {
          var transaction = orderData.purchase_units[0].payments.captures[0]
          if (transaction.status === "COMPLETED" && Number(transaction.amount.value) === Number(cartSubtotal)) {
            console.log("Update order in database")
          }
        })
      },
      onError: onErrorHandler,
    };
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
