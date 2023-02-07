import {Col, Container, ListGroup, Row} from "react-bootstrap"

const ProductListPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>{/* <SortOptionsComponent />*/}</ListGroup.Item>
            <ListGroup.Item>{/* <PriceFilterComponent />*/}</ListGroup.Item>
            <ListGroup.Item>{/* <RatingFilterComponent />*/}</ListGroup.Item>
            <ListGroup.Item>{/* <CategoryFilterComponent />*/}</ListGroup.Item>
          </ListGroup>
          <col md={9}>
            {/* <ProductListComponent>*/}
            {/* <PaginationComponent>*/}
          </col>
        </Col>
      </Row>
    </Container>
  );
};
export default ProductListPage;
