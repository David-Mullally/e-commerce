import { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditUserPageComponent = ({ updateUserApiRequest, fetchUser }) => {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState([]);
  const [isAdminState, setIsAdminState] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    message: "",
    error: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
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
      updateUserApiRequest(id, name, lastName, email, isAdmin)
        .then((data) => {
          if (data === "user updated") {
            navigate("/admin/users");
          }
        })
        .catch((er) =>
          setUpdateUserResponseState(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }

    setValidated(true);
  };

  useEffect(() => {
    fetchUser(id)
      .then((data) => {
        setUser(data);
        setIsAdminState(data.isAdmin);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id]);
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
                defaultValue={user.name}
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
                defaultValue={user.lastName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.UserBasicEmail">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                name="userEmail"
                required
                type="email"
                defaultValue={user.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="isAdmin"
                type="checkbox"
                label="Is Admin"
                checked={isAdminState}
                onChange={(e) => setIsAdminState(e.target.checked)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ marginBottom: "12vh" }}
            >
              Update
            </Button>
            {updateUserResponseState.error}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUserPageComponent;
