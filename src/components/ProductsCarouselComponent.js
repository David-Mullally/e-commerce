import Carousel from "react-bootstrap/Carousel";
import { LinkContainer } from "react-router-bootstrap";

const ProductsCarouselComponent = ({ bestSellers }) => {
  const cursorPointer = {
    cursor: "pointer",
  };
  console.log(bestSellers);
  return bestSellers.length > 0 ? (
    <Carousel>
      {bestSellers.map(
        (item, idx) => {
          {console.log("imagePath", item.images[0].path)}
          return (
            <div key={idx}>
              <Carousel.Item key={idx}>
                <img
                  objectfit="cover"
                  crossOrigin="anonymous"
                  className="d-block w-100"
                  style={{ height: "200px" }}
                  src={`${item.images ? item.images[0].path : null}`}
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
                  <LinkContainer style={cursorPointer} to={`/product-details/${item._id}`}>
                    <h3>Bestseller in {item.category}</h3>
                  </LinkContainer>
                  <p>{item.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            </div>
          );
        }
      )}
    </Carousel>
  ) : null;
};

export default ProductsCarouselComponent;
