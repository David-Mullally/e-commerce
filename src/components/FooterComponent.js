import { Col, Container, Row } from "react-bootstrap";

const FooterComponent = () => {
  return (
    <footer>
      <Container fluid>
        <Row className="mt-5">
          <Col className="bg-dark text-white text-center py-3">
            "Copyright &copy; ECOM"
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
