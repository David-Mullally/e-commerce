import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

const UserProfilePage = () => {
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
          <h1>User Profile</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>Your first name</Form.Label>
              <Form.Control
                required
                type="text"
                name="firstName"
                defaultValue="John"
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
                defaultValue="Doe"
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
                name="email"
                defaultValue="mullallydavid7@gmail.com"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Your phone number</Form.Label>
              <Form.Control
                required
                type="text"
                name="phoneNumber"
                placeholder="Enter Your Phone Number"
                defaultValue=""
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                name="address"
                placeholder="Enter Your Street Name and House Number"
                defaultValue=""
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                required
                type="text"
                name="Country"
                placeholder="Enter Your Country"
                defaultValue=""
              />
              <Form.Control.Feedback type="invalid">
                Passwords didn't match!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicZIP">
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control
                required
                type="text"
                name="ZIP"
                placeholder="Enter Your ZIP"
                defaultValue=""
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                type="text"
                name="city"
                placeholder="Enter Your City"
                defaultValue=""
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control
                required
                type="text"
                name="state"
                placeholder="Enter Your State"
                defaultValue=""
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Your password</Form.Label>
              <Form.Control
                required
                type="password"
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
                name="passwordConfirm"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Passwords didn't match!
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">Update</Button>
            <Alert show="true" variant="danger">
              User with this email already exists!
            </Alert>
            <Alert className="mb-5" show="true" variant="info">
              User updated successfully!
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
