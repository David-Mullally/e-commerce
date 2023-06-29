import CategoryCardComponent from "../../components/CategoryCardComponent";
import ProductsCarouselComponent from "../../components/ProductsCarouselComponent";
import { Container } from "react-bootstrap";

const HomePageComponent = () => {
  return (
    <>
      <ProductsCarouselComponent />
      <Container style={{display: "flex", flexWrap: "wrap", paddingBottom: "5vw" }}>
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <CategoryCardComponent key={index}
              img={`/images/carousel/carousel-${index + 1}.jpg`}
            />
          );
        })}
      </Container>
    </>
  );
};

export default HomePageComponent;