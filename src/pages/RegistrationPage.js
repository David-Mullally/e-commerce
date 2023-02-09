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

const RegistrationPage = () => {
  const [validated, setValidated] = useState(false);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const passwordConfirm = document.querySelector(
      "input[name=passwordConfirm]"
    );
    if (password.value === passwordConfirm.value) {
      passwordConfirm.setCustomValidity("");
    } else {
      passwordConfirm.setCustomValidity("Passwords don't match");
    }
  };

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
          <h1>Register</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>Your first name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your first name"
                name="firstName"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your first name!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Your surname</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your surname"
                name="surname"
              />
              <Form.Control.Feedback type="invalid">
                please enter your surname!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasiceMail">
              <Form.Label>Your e-mail</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your e-mail"
                name="email"
              />
              <Form.Control.Feedback type="invalid">
                please enter your e-mail!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Your password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                name="password"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                please must contain at least 6 characters!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Confirm password"
                name="passwordConfirm"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Passwords didn't match!
              </Form.Control.Feedback>
              <Row className="pb-2">
                <Col>
                  Already have an account?
                  <Link to="/login"> Log In</Link>{" "}
                </Col>
              </Row>
            </Form.Group>
            <Button type="submit">
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
              User with this email already exists!
            </Alert>
            <Alert className="mb-5" show="true" variant="info">
              registration successful!
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationPage;
