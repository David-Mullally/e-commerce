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
const UserCartDetailsPageComponent = ({
  cartItems,
  itemsCount,
  cartSubtotal,
  addToCart,
  removeFromCart,
  reduxDispatch,
  userInfo,
  getUser,
}) => {
  const changeCount = (productId, count) => {
    reduxDispatch(addToCart(productId, count));
  };

  const removeFromCartHandler = (productId, quantity, price) => {
    if (window.confirm("Are you sure?")) {
      reduxDispatch(removeFromCart(productId, quantity, price));
    }
  };

  getUser().then((res) => console.log(res));
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
              <b>Address</b>: 742 Evergreen Terrace, Springfield <br />
              <b>Phone</b>: 555-342672
            </Col>
            <Col md={6}>
              <h2>Payment Method</h2>
              <Form.Select>
                <option value="pp">PayPal</option>
                <option value="Ccod">Cash On delivery</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert variant="danger" className="mt-3">
                  Not Delivered. Please provide the nessecary information to
                  complete your order.
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
                <Button size="lg" variant="danger" type="button">
                  Pay For Order
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
