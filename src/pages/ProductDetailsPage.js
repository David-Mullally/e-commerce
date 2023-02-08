import { Alert, Button, Col, Container, Form, Image, ListGroup, Row } from "react-bootstrap";
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
            return <Image style={{maxWidth: "250px", maxHeight:"170px"}} fluid src={`/images/category-${idx + 1}.jpg`} />;
          })}
        </Col>
        <Col md={8} style={{height: "80vh" , overflowY: "scroll"}}>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>Cras Justo Odio</ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={4} />
                </ListGroup.Item>
                <ListGroup.Item>mABSCjAH mbasf kjABSJ</ListGroup.Item>
                <ListGroup.Item>myxbnc kjhas ihas</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>chjasdh jASFJ</ListGroup.Item>
                <ListGroup.Item>Ahf iAHDUAS</ListGroup.Item>
                <ListGroup.Item>
                  <Form.Select size="lg" aria-label="Default select example">
                    <option>Open this menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
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
                <ListGroup.Item>jAHWD Uahf jaH</ListGroup.Item>
                <ListGroup.Item>asncksan jaH</ListGroup.Item>
                <ListGroup.Item>mnkh  jASHU Uaghs</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <hr />
          send review form
          <Alert variant="danger">You must be loggin in to write a review</Alert>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTeaxarea1">
              <Form.Label>Example Textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Select aria-label="Default select example">
            <option>Open this menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Button variant="primary">Primary</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsPage;
