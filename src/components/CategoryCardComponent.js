import {Button,Card} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const CategoryCardComponent = (props) => {
  console.log(props.img)
  return (
    <Card style={{ margin: "0.5vw 2vw", padding: "2vw", width: "20vw"}}>
      <Card.Img
        variant="top"
        className="cc-image"
        crossOrigin="anonymous"
        objectfit="cover"
        style={{ maxHeight: "20vh" }}
        src={props.img}
      />
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Text>description</Card.Text>
        <LinkContainer to='/categories/:categoryId'>
          <Button variant="primary">Go To Jokes</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default CategoryCardComponent;
