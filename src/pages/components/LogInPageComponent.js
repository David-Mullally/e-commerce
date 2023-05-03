import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner'
import { Link } from "react-router-dom";

const LogInPageComponent = ({ LogInUserApiRequest }) => {
  const [validated, setValidated] = useState(false);
 /* const [loginUserResponseState, setLoginUserResponseState] = ({success: "", error: "", loading: false})*/



  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    if (event.currentTarget.checkValidity() === true && email && password) {
      LogInUserApiRequest(email, password, doNotLogout)
        .then((res) => console.log(res))
        .catch((err) =>
          console.log(
            err.response.data.message
              ? err.response.data.message
              : err.response.data,
        ));
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
                name="doNotLogout"
                label="Do Not Logout"
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
            <Alert show={false} variant="danger">
              invalid credentials
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LogInPageComponent;
