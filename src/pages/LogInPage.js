import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const LogInPage = () => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-3 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasiceMail">
              <Form.Label>Your e-mail</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your e-mail"
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Your password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                name="password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckBox">
              <Form.Check
                type="checkbox"
                name="remainLoggedIn"
                label="Remain Logged In"
              />
            </Form.Group>
            <Row className="pb-2">
              <Col>
                Don't have an account yet?
                <Link to="/register"> Sign Up!</Link>{" "}
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              <Spinner
                as="spin"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              ></Spinner>
              Submit
            </Button>
            <Alert show="true" variant="danger">
              invalid credentials
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LogInPage;
