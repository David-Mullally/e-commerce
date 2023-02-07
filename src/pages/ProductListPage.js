import {Button, Col, Container, ListGroup, Row} from "react-bootstrap"
/////My Components//////////////
import AttributesFilterComponent from "../components/filterQueryResultOptions/AttributesFilterComponent";
import CategoryFilterComponent from "../components/filterQueryResultOptions/CategoryFilterComponent";
import PaginationComponent from "../components/PaginationComponent"
import PriceFilterComponent from "../components/filterQueryResultOptions/PriceFilterComponent";
import ProductForListComponent from "../components/ProductForListComponent";
import RatingFilterComponent from "../components/filterQueryResultOptions/RatingFilterComponent";
import SortOptionsComponent from "../components/SortOptionsComponent";

const ProductListPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item><SortOptionsComponent /></ListGroup.Item>
            <ListGroup.Item><PriceFilterComponent /></ListGroup.Item>
            <ListGroup.Item><RatingFilterComponent /></ListGroup.Item>
            <ListGroup.Item><CategoryFilterComponent /></ListGroup.Item>
            <ListGroup.Item><AttributesFilterComponent /></ListGroup.Item>
          </ListGroup>
          <Button variant="primary">Primary</Button>
          <Button variant="danger">Danger</Button>
          </Col>
          <Col md={9}>
            <ProductForListComponent  />
            <PaginationComponent />
          </Col>
      </Row>
    </Container>
  );
};
export default ProductListPage;
