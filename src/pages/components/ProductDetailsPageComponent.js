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
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";
import { Rating } from "react-simple-star-rating";
import ImageZoom from "js-image-zoom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  reduxDispatch,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
  };

  var options123 = {
    scale: 2,
    offset: { vertical: 0, horizontal: 0 },
    zoomPosition: "right",
  };

  var options4 = {
    scale: 2,
    offset: { vertical: 0, horizontal: 0 },
    zoomPosition: "top",
  };

  useEffect(() => {
    new ImageZoom(document.getElementById("first"), options123);
    new ImageZoom(document.getElementById("second"), options123);
    new ImageZoom(document.getElementById("third"), options123);
    new ImageZoom(document.getElementById("forth"), options4);
  });
  return (
    <Container>
      <AddedToCartMessageComponent />
      <Row className="mt-2">
        <Col md={4} style={{ zIndex: 1 }}>
          <div id="first">
            <Image
              crossOrigin="anonymous"
              style={{ maxWidth: "190px", maxHeight: "170px" }}
              fluid
              src={`/images/category-1.jpg`}
            />
          </div>
          <br />
          <div id="second">
            <Image
              crossOrigin="anonymous"
              style={{ maxWidth: "190px", maxHeight: "170px" }}
              fluid
              src={`/images/category-2.jpg`}
            />
          </div>
          <br />
          <div id="third">
            <Image
              crossOrigin="anonymous"
              style={{ maxWidth: "190px", maxHeight: "170px" }}
              fluid
              src={`/images/category-3.jpg`}
            />
          </div>
          <br />
          <div id="forth">
            <Image
              crossOrigin="anonymous"
              style={{ maxWidth: "190px", maxHeight: "170px" }}
              fluid
              src={`/images/category-4.jpg`}
            />
          </div>
          <br />
        </Col>
        <Col md={8} style={{ height: "60vh", overflowY: "scroll" }}>
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
                  <Form.Select
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    size="lg"
                    aria-label="Default select example"
                  >
                    <option>Choose:</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button onClick={addToCartHandler} variant="danger">
                    Add To Cart
                  </Button>
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
            <Button className="mb-3 mt-3" variant="primary">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsPageComponent;
