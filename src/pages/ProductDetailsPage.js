import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddedToCartMessageComponent from "../components/AddedToCartMessageComponent";
import { Rating } from "react-simple-star-rating";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  return (
    <Container>
      <AddedToCartMessageComponent />
      <Row className="mt-5">
        <Col md={4}>
          {Array.from({ length: 5 }).map((_, idx) => {
            return (
              <Image
                style={{ maxWidth: "250px", maxHeight: "170px" }}
                fluid
                src={`/images/category-${idx + 1}.jpg`}
              />
            );
          })}
        </Col>
        <Col md={8} style={{ height: "80vh", overflowY: "scroll" }}>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>Product Name</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={4} />
                  (1)
                </ListGroup.Item>
                <ListGroup.Item>
                  Price <span className="fw-bold">$500</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  myxbnc kjhas ihas mnABSjsaj kasbjcbashsa jahsjcabs hagScibash
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>Status: In Stock</ListGroup.Item>
                <ListGroup.Item>
                  Price <span className="fw-bold">$500</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Select size="lg" aria-label="Default select example">
                    <option>1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                    <option value="3">4</option>
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="danger">Add To Cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>REVIEWS</h5>
              <ListGroup variant="flush">
                {Array.from({ length: 10 }).map((item, idx) => (
                  <ListGroup.Item key={idx}>
                    John Doe <br />
                    <Rating readonly size={20} initialValue={4} />
                    <br />
                    20-09-2022 <br />
                    kahciahs jagsu ubasuGASC UAgsf78AGS uiagsu 9AGSC IUAgsasbcu{" "}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <hr />
          send review form
          <Alert variant="danger">
            You must be loggin in to write a review
          </Alert>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTeaxarea1"
            >
              <Form.Label>Write A Review</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Select aria-label="Default select example">
              <option>Rating</option>
              <option value="5">5 (Very Good)</option>
              <option value="4">4 (Good)</option>
              <option value="3">3 (Average)</option>
              <option value="2">2 (Poor)</option>
              <option value="1">1 (Awful)</option>
            </Form.Select>
            <Button className="mb-3 mt-3" variant="primary">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsPage;
