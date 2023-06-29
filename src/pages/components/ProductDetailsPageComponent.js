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
import { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";

const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  reduxDispatch,
  getProductDetails,
  userInfo,
  writeReviewAPIRequest,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productReviewed, setProductReviewed] = useState(false);

  const messagesEndRef = useRef(null);

  const { id } = useParams();

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    setShowCartMessage(true);
  };

  /* var options123 = {
    scale: 2,
    offset: { vertical: 0, horizontal: 0 },
    zoomPosition: "right",
  }; */

  /* var options4 = {
    scale: 2,
    offset: { vertical: 0, horizontal: 0 },
    zoomPosition: "top",
  }; */

  useEffect(() => {
    if (productReviewed) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"})
      },200)
    }
  }, [productReviewed])

  useEffect(() => {
    if (product.images) {
      var options = {
        // width: 400,
        // zoomWidth: 500,
        // fillContainer: true,
        // zoomPosition: "bottom",
        scale: 2,
        offset: { vertical: 0, horizontal: 0 },
      };
      product.images.map(
        (image, id) =>
          new ImageZoom(document.getElementById(`imageId${id + 1}`), options)
      );
    }
  });

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id, productReviewed]);

  const sendReviewHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    };
    if (e.currentTarget.checkValidity() === true) {
      writeReviewAPIRequest(product._id, formInputs)
        .then((data) => {
          if (data === "review created") {
            setProductReviewed("You successfully reviewed the product!");
          }
        })
        .catch((er) =>
          setProductReviewed(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }
  };

  return (
    <Container>
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row className="mt-2">
        {loading ? (
          <h2>Loading product details...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <Col md={4} style={{ zIndex: 1 }}>
              {product.images
                ? product.images.map((image, id) => (
                    <div kex={id}>
                      <div key={id} id={`imagesId${id + 1}`}>
                        <Image
                          crossOrigin="anonymous"
                          style={{ maxWidth: "190px", maxHeight: "170px" }}
                          fluid
                          src={`${image.path ?? null}`}
                        />
                      </div>
                      <br />
                    </div>
                  ))
                : null}
            </Col>
            <Col md={8} style={{ height: "60vh", overflowY: "scroll" }}>
              <Row>
                <Col md={8}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h1>{product.name}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        readonly
                        size={20}
                        initialValue={product.rating}
                      />
                      ({product.reviewsNumber})
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price <span className="fw-bold">${product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>{product.description}</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4}>
                  <ListGroup>
                    <ListGroup.Item>
                      Status: {product.count > 0 ? "In Stock" : "Out Of Stock"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price <span className="fw-bold">${product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Form.Select
                        defaultValue={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        size="lg"
                        aria-label="Default select example"
                      >
                        {[...Array(product.count).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
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
                    {product.reviews &&
                      product.reviews.map((review, idx) => (
                        <ListGroup.Item key={idx}>
                          John Doe <br />
                          <Rating
                            readonly
                            size={20}
                            initialValue={review.rating}
                          />
                          <br />
                          {review.createdAt.substring(0, 10)} <br />
                          {review.comment}{" "}
                        </ListGroup.Item>
                      ))}
                        <div ref={messagesEndRef} />
                  </ListGroup>
                </Col>
              </Row>
              <hr />
              send review form
              {!userInfo && (
                <Alert variant="danger">
                  You must be loggin in to write a review
                </Alert>
              )}
              <Form onSubmit={sendReviewHandler}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTeaxarea1"
                >
                  <Form.Label>Write A Review</Form.Label>
                  <Form.Control
                    name="comment"
                    required
                    disabled={!userInfo.name}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Form.Select
                  name="rating"
                  required
                  disabled={!userInfo.name}
                  aria-label="Default select example"
                >
                  <option value="">Rating</option>
                  <option value="5">5 (Very Good)</option>
                  <option value="4">4 (Good)</option>
                  <option value="3">3 (Average)</option>
                  <option value="2">2 (Poor)</option>
                  <option value="1">1 (Awful)</option>
                </Form.Select>
                <Button
                  disabled={!userInfo.name}
                  type="submit"
                  lastName="mb-3 mt-3"
                  variant="primary"
                >
                  Submit
                </Button>
                {productReviewed}
              </Form>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default ProductDetailsPageComponent;
