import { Fragment, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";

const AdminChatRoomComponent = () => {
  const [toast1, closeToast1] = useState();
  const close1 = () => closeToast1(false);

  const [toast2, closeToast2] = useState();
  const close2 = () => closeToast2(false);

  return (
      <div style={{ display: "flex"}}>
      <Toast show={toast1} onClose={close1} className="ms-4 mb-5">
        <Toast.Header>
          <strong className="me-auto">Chat With John Doe</strong>
        </Toast.Header>
        <Toast.Body>
          <div style={{ maxHeight: "500px", overflow: "auto" }}>
            {Array.from({ length: 30 }).map((_, idx) => (
              <Fragment key={idx}>
                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                  <b>User Wrote:</b> Hello World! This is a chat message!
                </p>
                <p>
                  <b>You Wrote:</b> Hello World! This is a chat message!
                </p>
              </Fragment>
            ))}
          </div>
          <Form.Group>
            <Form.Label>Write A Message</Form.Label>
            <Form.Control as="textarea" rows={2}></Form.Control>
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Toast.Body>
      </Toast>
      <Toast show={toast2} onClose={close2} className="ms-4 mb-5">
        <Toast.Header>
          <strong className="me-auto">Chat With Jane Doe</strong>
        </Toast.Header>
        <Toast.Body>
          <div style={{ maxHeight: "500px", overflow: "auto" }}>
            {Array.from({ length: 30 }).map((_, idx) => (
              <Fragment key={idx}>
                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                  <b>User Wrote:</b> Hello World! This is a chat message!
                </p>
                <p>
                  <b>You Wrote:</b> Hello World! This is a chat message!
                </p>
              </Fragment>
            ))}
          </div>
          <Form.Group>
            <Form.Label>Write A Message</Form.Label>
            <Form.Control as="textarea" rows={2}></Form.Control>
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default AdminChatRoomComponent;
