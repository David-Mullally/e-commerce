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
const UserOrderDetailsPageComponent = ({ userInfo, getUser }) => {
  const [userAddress, setUserAddress] = useState({});

  useEffect(() => {
    getUser().then((data) => {
      setUserAddress({
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        phoneNumber: data.phoneNumber,
      }).catch((err) => console.log(err));
    });
  }, []);
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
              <b>Address</b>: {userAddress.address} {userAddress.city} {userAddress.state} {userAddress.zipCode} {userAddress.country} <br />
              <b>Phone</b>: {userAddress.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Payment Method</h2>
              <Form.Select disabled={false}>
                <option value="pp">PayPal</option>
                <option value="Ccod">Cash On delivery</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert variant="danger" className="mt-3">
                  Not Delivered{" "}
                </Alert>
              </Col>
              <Col>
                <Alert variant="success" className="mt-3">
                  Paid on 21-01-2023{" "}
                </Alert>
              </Col>
            </Row>
          </Row>
          <h2>Order Items</h2>
          <ListGroup variant="flush" style={{ height: "500px" }}>
            {Array.from({ length: 3 }).map((item, idx) => (
              <CartItemComponent
                item={{
                  image: { path: "/images/tablets-category.png" },
                  name: "Product name",
                  price: 10,
                  count: 10,
                  quantity: 10,
                }}
                key={idx}
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
              Items Price (incl. Tax): <span className="fw-bold">$150</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">Included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">Included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total Price: <span className="fw-bold">$300</span>
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

export default UserOrderDetailsPageComponent;
