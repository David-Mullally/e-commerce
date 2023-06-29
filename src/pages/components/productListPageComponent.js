import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
/////My Components//////////////
import AttributesFilterComponent from "../../components/filterQueryResultOptions/AttributesFilterComponent";
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent";
import PaginationComponent from "../../components/PaginationComponent";
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent";
import ProductForListComponent from "../../components/ProductForListComponent";
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent";
import SortOptionsComponent from "../../components/SortOptionsComponent";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductListPageComponent = ({ getProducts, categories }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attrsFilter, setAttrsFilter] = useState([]);
  const [attrsFromFilter, setAttrsFromFilter] = useState([]);

  console.log(attrsFromFilter)

  const { categoryName } = useParams() || "";

  useEffect(() => {
    if (categoryName) {
      let categoryAllData = categories.find(
        (item) => item.name === categoryName.replaceAll(",", "/")
      );
      if (categoryAllData) {
        let mainCategory = categoryAllData.name.split("/")[0];
        let index = categories.findIndex((item) => item.name === mainCategory);
        setAttrsFilter(categories[index].attrs);
      }
    } else {
      setAttrsFilter([]);
    }
  }, [categoryName, categories]);

  useEffect(() => {
    getProducts().then((products) => setProducts(products.products));
    setLoading(false).catch((err) => {
      console.log(err);
      setError(true);
    });
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
              <AttributesFilterComponent attrsFilter={attrsFilter} setAttrsFromFilter={setAttrsFromFilter} />
            </ListGroup.Item>
          </ListGroup>
          <Button variant="primary">Filter</Button>{" "}
          <Button variant="danger">Reset Filters</Button>
        </Col>
        <Col md={9}>
          {loading ? (
            <h1>Loading products....</h1>
          ) : error ? (
            <h1>Error while loading products. Try again later.</h1>
          ) : (
            products.map((product) => {
              return (
                <ProductForListComponent
                  key={product._id}
                  images={product.images}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  rating={product.rating}
                  reviewsNumber={product.reviewsNumber}
                  productId={product._id}
                />
              );
            })
          )}

          <PaginationComponent />
        </Col>
      </Row>
    </Container>
  );
};
export default ProductListPageComponent;
