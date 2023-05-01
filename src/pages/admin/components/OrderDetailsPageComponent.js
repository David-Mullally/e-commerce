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
  const OrderDetailsPageComponent = () => {
    return (
      <Container fluid>
        <Row className="mt-4">
          <h1>Order Details</h1>
          <Col md={8}>
            <br />
            <Row>
              <Col md={6}>
                <h2>Shipping</h2>
                <b>Name</b>: John Doe <br />
                <b>Address</b>: 742 Evergreen Terrace, Springfield <br />
                <b>Phone</b>: 555-342672
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
            <ListGroup variant="flush" style={{height: "500px"}}>
              {Array.from({ length: 3 }).map((item, idx) => (
                <CartItemComponent key={idx} />
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
                    Mark As Delivered
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
  