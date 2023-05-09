import { Button, Card } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { LinkContainer } from "react-router-bootstrap";

const ProductForListComponent = ({
  images,
  name,
  description,
  price,
  rating,
  reviewsNumber,
  productId,
}) => {
  return (
    <div>
      <Card
        style={{ marginTop: "10px", marginBottom: "10px", maxHeight: "180px" }}
      >
        <Card.Img
          crossOrigin="anonymous"
          varaint="top"
          src={images[0] ? images[0].path : ""}
          style={{ maxHeight: "50px", maxWidth: "100px" }}
        ></Card.Img>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>
            <Rating readonly size={20} initialValue={rating} /> ({reviewsNumber}
            )
          </Card.Text>
          <Card.Text className="h4">${price} </Card.Text>
          <LinkContainer to={`/product-details/${productId}`}>
            <Button variant="primary">Go To</Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductForListComponent;
