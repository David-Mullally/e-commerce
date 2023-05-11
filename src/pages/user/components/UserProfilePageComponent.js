import { useState, useEffect } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

const UserProfilePageComponent = ({
  updateUserApiRequest,
  fetchUser,
  userInfoFromRedux,
  setReduxUserState,
  reduxDispatch,
  localStorage,
  sessionStorage,
}) => {
  const [validated, setValidated] = useState(false);
  const [updateUserResponseRequest, setUpdateUserResponseRequest] = useState({
    success: "",
    error: "",
  });
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);
    const [user, setUser] = useState({});
    const userInfo = userInfoFromRedux;

  useEffect(() => {
    fetchUser(userInfo._id)
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, [userInfo._id]);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const passwordConfirm = document.querySelector(
      "input[name=passwordConfirm]"
    );
    if (password.value === passwordConfirm.value) {
      setPasswordsMatchState(true);
    } else {
      setPasswordsMatchState(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const name = form.name.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const zipCode = form.zipCode.value;
    const country = form.country.value;
    const city = form.city.value;
    const state = form.state.value;
    const password = form.password.value;
    if (
      event.currentTarget.checkValidity() === true &&
      form.password.value === form.passwordConfirm.value
    ) {
      updateUserApiRequest(
        name,
        lastName,
        phoneNumber,
        address,
        zipCode,
        country,
        city,
        state,
        password
      )
        .then((data) => {
            setUpdateUserResponseRequest({ success: data.success, error: "" });
            reduxDispatch(setReduxUserState({ doNotLogout: userInfo.doNotLogout, ...data.userUpdated }));
            if (userInfo.doNotLogout) localStorage.setItem("userInfo", JSON.stringify({ doNotLogout: true, ...data.userUpdated }));
            else sessionStorage.setItem("userInfo", JSON.stringify({ doNotLogout: false, ...data.userUpdated }));
        })
        .catch((err) =>
          setUpdateUserResponseRequest({
            error: err.response.data
              ? err.response.data.message
              : err.response.data,
          })
        );
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
                type="text"
                name="name"
                defaultValue={user.name}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your first name!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Your surname</Form.Label>
              <Form.Control
                type="text"
                defaultValue={user.lastName}
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                please enter your surname!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasiceMail">
              <Form.Label>Your e-mail</Form.Label>
              <Form.Control
                value={`${user.email}: This may not be changed`}
                disabled
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Your phone number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter Your Phone Number"
                defaultValue={user.phoneNumber}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter Your Street Name and House Number"
                defaultValue={user.address}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                placeholder="Enter Your Country"
                defaultValue={user.country}
              />
              <Form.Control.Feedback type="invalid">
                Passwords didn't match!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicZIP">
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                placeholder="Enter Your ZIP"
                defaultValue={user.zipCode}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter Your City"
                defaultValue={user.city}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                placeholder="Enter Your State"
                defaultValue={user.state}
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
                isInvalid={!passwordsMatchState}
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
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Passwords don't match!
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
            <Alert
              show={
                updateUserResponseRequest &&
                updateUserResponseRequest.error !== ""
              }
              variant="danger"
            >
              something went wrong
            </Alert>
            <Alert
              className="mb-5"
              show={
                updateUserResponseRequest &&
                updateUserResponseRequest.success === "user updated"
              }
              variant="info"
            >
              User updated successfully!
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePageComponent;
