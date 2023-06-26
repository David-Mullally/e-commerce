import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const EditUserPageComponent = ({ updateUserApiRequest }) => {
  const [validated, setValidated] = useState(false);
  {
    /*const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const passwordConfirm = document.querySelector(
      "input[name=passwordConfirm]"
    );
    if (password.value === passwordConfirm.value) {
      passwordConfirm.setCustomValidity("");
    } else {
      passwordConfirm.setCustomValidity("Passwords don't match");
    }
  };*/
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
      const form = event.currentTarget.elements;
      const name = form.name.value;
      const lastName = form.lastName.value;
      const email = form.email.value;
      const isAdmin = form.isAdmin.checked;
      if (event.currentTarget.checkValidity() === true) {
        updateUserApiRequest(name, lastName, email, isAdmin)
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md={1}>
          <Link className="btn btn-info my-3" to="/admin/products">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h3>Edit User</h3>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUserLastName">
              <Form.Label>User First Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="User First Name"
                defaultValue="John"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="form.ProductDescriptionTextArea"
            >
              <Form.Label>Users Last Name</Form.Label>
              <Form.Control
                name="userLastName"
                required
                type="text"
                defaultValue="Doe"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.UserBasicEmail">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                name="userEmail"
                required
                type="email"
                defaultValue="John@Doe.com"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check name="isAdmin" type="checkbox" label="Is Admin" />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ marginBottom: "12vh" }}
            >
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUserPageComponent;
