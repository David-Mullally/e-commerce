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
