import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  return (
    <Container>
      <Row className="mt-5">
        <Col md={4}>images</Col>
        <Col md={8}>
          <Row>
            <Col md={8}>product name, price, description, rating</Col>
            <Col md={4}>product status, quantity</Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>REVIEWS</h5>
            </Col>
          </Row>
          <hr />
          send review form
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsPage;
