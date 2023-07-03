import { Fragment, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";

const AdminChatRoomComponent = ({chatRoom, roomIndex, socketUser}) => {
  [window["toast" + roomIndex], window["closeToast" + roomIndex]] = useState(true);

  const close = () => {
    window["closeToast" + roomIndex](false);
  }

  return (
      <div style={{ display: "flex"}}>
      <Toast show={window["toast" + roomIndex]} onClose={()=> close()} className="ms-4 mb-5">
        <Toast.Header>
          <strong className="me-auto">Chat With User</strong>
        </Toast.Header>
        <Toast.Body>
          <div style={{ maxHeight: "500px", overflow: "auto" }}>
            {chatRoom[1].map((msg, idx) => (
              <Fragment key={idx}>
                {msg.client && (
                  <p key={idx} className="bg-primary p-3 ms-4 text-light rounded-pill">
                  <b>User Wrote:</b> {msg.client}
                </p>
                )}
                {msg.admin && (
                  <p key={idx}>
                  <b>You Wrote:</b> {msg.admin}
                </p>
                )}
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
