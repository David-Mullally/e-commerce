import CategoryCardComponent from "../../components/CategoryCardComponent";
import ProductsCarouselComponent from "../../components/ProductsCarouselComponent";
import { Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

const HomePageComponent = ({ categories, getBestSellers }) => {
  const [mainCategories, setMainCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    getBestSellers()
      .then((data) => {
        setBestSellers(data);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
    setMainCategories((cat) =>
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories]);

  return (
    <>
      <ProductsCarouselComponent bestSellers={bestSellers} />
      <Container
        style={{ display: "flex", flexWrap: "wrap", paddingBottom: "5vw" }}
      >
        <Row xs={1} md={2} className="g-4 mt-5">
          {mainCategories.map((category, idx) => {
            return (
              <CategoryCardComponent key={idx} category={category} idx={idx} />
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default HomePageComponent;
