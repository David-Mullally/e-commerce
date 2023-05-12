import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";
import { useEffect, useState } from "react";
import { logout } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
const UserCartDetailsPageComponent = ({
  cartItems,
  itemsCount,
  cartSubtotal,
  addToCart,
  removeFromCart,
  reduxDispatch,
  userInfo,
  getUser,
  createOrder,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userAddress, setUserAddress] = useState(false);
  const [missingAddress, setMissingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("pp");
    const navigate=useNavigate()
  const changeCount = (productId, count) => {
    reduxDispatch(addToCart(productId, count));
  };

  const removeFromCartHandler = (productId, quantity, price) => {
    if (window.confirm("Are you sure?")) {
      reduxDispatch(removeFromCart(productId, quantity, price));
    }
  };

  useEffect(() => {
    getUser()
      .then((data) => {
        if (
          !data.address ||
          !data.city ||
          !data.zipCode ||
          !data.phoneNumber ||
          !data.state ||
          !data.country
        ) {
          setMissingAddress(
            "You must fill in your billing information to make an order"
          );
          setButtonDisabled(true);
        } else {
          setUserAddress({
            address: data.address,
            city: data.city,
            zipCode: data.zipCode,
            state: data.state,
            country: data.country,
            phoneNumber: data.phoneNumber,
          });
          setMissingAddress(false);
        }
      })
      .catch((err) => {
        reduxDispatch(logout());
        /*console.log( err.response.data.message
            ? err.response.data.message
            : err.response.data)*/
      });
  }, [userInfo._id]);

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: cartSubtotal,
      },
      cartItems: cartItems.map((item) => {
        return {
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: { path: item.image ? item.image.path ?? null : null },
          quantity: item.quantity,
          count: item.count,
        };
      }),
      paymentMethod: paymentMethod,
    };
    createOrder(orderData)
      .then((data) => {
        console.log("createOrder:", data)
        if (data) {
          navigate(`/user/order-details/${data.Id}`);
        }
      })
      .catch((err) => console.log(err));
  };

  const choosePayment = (e) => {
    setPaymentMethod(e.target.value);
  };
  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Cart Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: {userInfo.name} {userInfo.lastName}
              <br />
              <b>Address</b>:{userAddress.address} {userAddress.city}{" "}
              {userAddress.state} {userAddress.zipCode}
              <br />
              <b>Phone</b>: {userAddress.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Payment Method</h2>
              <Form.Select onChange={choosePayment}>
                <option value="pp">PayPal</option>
                <option value="Ccod">Cash On delivery</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert variant="danger" className="mt-3">
                  Not Delivered. *{missingAddress}.
                </Alert>
              </Col>
              <Col>
                <Alert variant="success" className="mt-3">
                  Not paid yet.
                </Alert>
              </Col>
            </Row>
          </Row>
          <h2>Order Items</h2>
          <ListGroup variant="flush" style={{ height: "500px" }}>
            {cartItems.map((item, idx) => (
              <CartItemComponent
                item={item}
                key={idx}
                removeFromCartHandler={removeFromCartHandler}
                changeCount={changeCount}
              />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order Summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items Price (incl. Tax):{" "}
              <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">Included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">Included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total Price: <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              <div className="d-grid gap-2">
                <Button
                  onClick={orderHandler}
                  size="lg"
                  variant="danger"
                  type="button"
                  disabled={buttonDisabled}
                >
                  Place Order
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCartDetailsPageComponent;
