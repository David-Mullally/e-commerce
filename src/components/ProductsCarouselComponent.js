import Carousel from "react-bootstrap/Carousel";
import { LinkContainer } from "react-router-bootstrap";

const ProductsCarouselComponent = () => {
  const cursorPointer = {
    cursor: "pointer",
  };

  return (
    <Carousel>
      <Carousel.Item >
        <img
          objectfit="cover"
          crossOrigin="anonymous"
          className="d-block w-100"
          style={{ height: "200px" }}
          src={"/images/carousel/carousel-1.webp"}
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
            <h1>Dad Jokes</h1>
          </LinkContainer>
          <p>Stock up on jokes</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          objectfit="cover"
          crossOrigin="anonymous"
          className="d-block w-100"
          style={{ height: "200px" }}
          src={"/images/carousel/carousel-2.jpg"}
          alt="Second slide"
        />

        <Carousel.Caption
          style={{
            backgroundColor: "gray",
            opacity: 0.8,
            textAlign: "center",
            margin: "0 20vw",
          }}
        >
          <LinkContainer style={cursorPointer} to="/resources">
            <h1>Resources</h1>
          </LinkContainer>
          <p>Help, advice, services and more.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          objectfit="cover"
          crossOrigin="anonymous"
          className="d-block w-100"
          style={{ height: "200px" }}
          src={"/images/carousel/carousel-3.jpg"}
          alt="Third slide"
        />

        <Carousel.Caption
          style={{
            backgroundColor: "gray",
            opacity: 0.8,
            textAlign: "center",
            margin: "0 20vw",
          }}
        >
          <LinkContainer style={cursorPointer} to="/dad-music">
            <h1>Dad Music</h1>
          </LinkContainer>
          <p>Best music for dads</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          objectfit="cover"
          crossOrigin="anonymous"
          className="d-block w-100"
          style={{ height: "200px" }}
          src={"/images/carousel/carousel-4.jpg"}
          alt="Third slide"
        />

        <Carousel.Caption
          style={{
            backgroundColor: "gray",
            opacity: 0.8,
            textAlign: "center",
            margin: "0 20vw",
          }}
        >
          <LinkContainer style={cursorPointer} to="/posts">
            <h1>Take notes</h1>
          </LinkContainer>
          <p>see what others have to say!</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          objectfit="cover"
          crossOrigin="anonymous"
          className="d-block w-100"
          style={{ height: "200px" }}
          src={"/images/carousel/carousel-5.jpg"}
          alt="Third slide"
        />

        <Carousel.Caption
          style={{
            backgroundColor: "gray",
            opacity: 0.8,
            textAlign: "center",
            margin: "0 20vw",
          }}
        >
          <LinkContainer style={cursorPointer} to="/products">
            <h1>Treat Yourself</h1>
          </LinkContainer>
          <p>get it yourself</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ProductsCarouselComponent;
