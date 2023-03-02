import Carousel from "react-bootstrap/Carousel";
import { LinkContainer } from "react-router-bootstrap";

const ProductsCarouselComponent = () => {
  const cursorPointer = {
    cursor: "pointer",
  };

  return (
    <Carousel>
      {["random-dad-jokes", "resources", "dad-music", "posts", "gadgets"].map(
        (category, idx) => {
          return (
            <div key={idx}>
              <Carousel.Item>
                <img
                  objectfit="cover"
                  crossOrigin="anonymous"
                  className="d-block w-100"
                  style={{ height: "200px" }}
                  src={`/images/category-${idx + 1}.jpg`}
                  alt="First slide"
                />
                <Carousel.Caption
                  style={{
                    backgroundColor: "gray",
                    opacity: 0.8,
                    textAlign: "center",
                    margin: "0 20vw",
                  }}
                >
                  <LinkContainer style={cursorPointer} to="/random-dad-jokes">
                    <h1>{category}</h1>
                  </LinkContainer>
                  <p>go to category</p>
                </Carousel.Caption>
              </Carousel.Item>
            </div>
          );
        }
      )}
    </Carousel>
  );
};

export default ProductsCarouselComponent;
