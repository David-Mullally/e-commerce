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

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const OrderDetailsPageComponent = ({ getOrder, markAsDelivered }) => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] =
    useState("Mark as Delivered");
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    getOrder(id)
      .then((order) => {
        setUserInfo(order.user);
        setPaymentMethod(order.paymentMethod);
        order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
        order.isDelivered
          ? setIsDelivered(order.deliveredAt)
          : setIsDelivered(false);
        setCartSubtotal(order.orderTotal.cartSubtotal);
        if (order.isDelivered) {
          setOrderButtonMessage("Order Is Finished");
          setButtonDisabled(true);
        }
        setCartItems(order.cartItems);
      })
      .catch(
        (err) => dispatch(logout())
        /*console.log({
          name: err.response.data.message
            ? err.response.data.message
            : err.response.data,
        })*/
      );
  }, [isDelivered, id]);

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Address</b>: {userInfo.address} {userInfo.city}{" "}
              {userInfo.zipCode}
              <br />
              <b>Phone</b>: {userInfo.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Payment Method</h2>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="pp">PayPal</option>
                <option value="cod">Cash On delivery</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert
                  variant={isDelivered ? "success" : "danger"}
                  className="mt-3"
                >
                  {isDelivered ? (
                    <>Delivered at {isDelivered}</>
                  ) : (
                    <>Not Delivered</>
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert variant={isPaid ? "success" : "danger"} className="mt-3">
                  {isPaid ? <>Paid at {isDelivered}</> : <>Not Paid</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <h2>Order Items</h2>
          <ListGroup variant="flush" style={{ height: "500px" }}>
            {cartItems.map((item, idx) => (
              <CartItemComponent key={idx} item={item} orderCreated={true} />
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
              <span className="fw-bold">{cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">Included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">Included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total Price: <span className="fw-bold">{cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              <div className="d-grid gap-2">
                <Button
                  disabled={buttonDisabled}
                  onClick={() =>
                    markAsDelivered(id)
                      .then((res) => {
                        if (res) {
                          setIsDelivered(true);
                        }
                      })
                      .catch((err) =>
                        console.log([
                          {
                            name: err.response.data.message
                              ? err.response.data.message
                              : err.response.data,
                          },
                        ])
                      )
                  }
                  size="lg"
                  variant="danger"
                  type="button"
                >
                  {orderButtonMessage}
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetailsPageComponent;
