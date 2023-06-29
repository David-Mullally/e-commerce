import {Button,Card} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const CategoryCardComponent = ({category, idx}) => {
  return (
    <Card style={{ margin: "0.5vw 2vw", padding: "2vw", width: "20vw"}}>
      <Card.Img
        variant="top"
        className="cc-image"
        crossOrigin="anonymous"
        objectfit="cover"
        style={{ maxHeight: "20vh" }}
        src={category.image ?? null}
      />
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        <Card.Text>{category.description}</Card.Text>
        <LinkContainer to={`/product-list/category/${category.name}`}>
          <Button variant="primary">Go To {category.name}</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default CategoryCardComponent;
