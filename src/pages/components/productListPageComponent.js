import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
/////My Components//////////////
import AttributesFilterComponent from "../../components/filterQueryResultOptions/AttributesFilterComponent";
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent";
import PaginationComponent from "../../components/PaginationComponent";
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent";
import ProductForListComponent from "../../components/ProductForListComponent";
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent";
import SortOptionsComponent from "../../components/SortOptionsComponent";

import { useEffect } from "react";

const ProductListPageComponent = ({ getProducts }) => {
  useEffect(() => {
    getProducts().then((products) => console.log(products));
  }, []);

  return (
    <Container fluid className="product-list-page">
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
              <SortOptionsComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              FILTER: <br />
              <PriceFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <CategoryFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <AttributesFilterComponent />
            </ListGroup.Item>
          </ListGroup>
          <Button variant="primary">Filter</Button>{" "}
          <Button variant="danger">Reset</Button>
        </Col>
        <Col md={9}>
          {Array.from({ length: 5 }).map((_, idx) => {
            return (
              <ProductForListComponent
                key={idx}
                images={["games", "monitors", "tablets", "games", "monitors"]}
                idx={idx}
              />
            );
          })}

          <PaginationComponent />
        </Col>
      </Row>
    </Container>
  );
};
export default ProductListPageComponent;
