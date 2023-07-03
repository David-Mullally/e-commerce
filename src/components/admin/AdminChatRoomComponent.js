import { Fragment, useState, useEffect } from "react";
import { Button, Form, Toast } from "react-bootstrap";

const AdminChatRoomComponent = ({ chatRoom, roomIndex, socketUser, socket }) => {
  [window["toast" + roomIndex], window["closeToast" + roomIndex]] =
    useState(true);

  const close = () => {
    window["closeToast" + roomIndex](false);
  };

  const [rerender, setRerender] = useState(false);

  const adminSubmitChatMsg = (e, elm) => {
    e.preventDefault();
    if (e.keyCode && e.keyCode !== 13) {
      return;
    }
    const msg = document.getElementById(elm);
    let v = msg.value.trim();
    console.log("adminMsg", v)
    if (v === "" || v === null || v === false || !v) {
      return;
    }
    chatRoom[1].push({ admin: msg.value });
    socket.emit("admin sends message", {
      message: v,
    })
    setRerender(!rerender);
    msg.focus();
    setTimeout(() => {
      msg.value = "";
      const chatMessages = document.querySelector(`.cht-msg${socketUser}`);
      if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 200)
  };

  useEffect(() => {
    const chatMessages = document.querySelector(`.cht-msg${socketUser}`);
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
  })

  return (
    <div style={{ display: "flex" }}>
      <Toast
        show={window["toast" + roomIndex]}
        onClose={() => close()}
        className="ms-4 mb-5"
      >
        <Toast.Header>
          <strong className="me-auto">Chat With User</strong>
        </Toast.Header>
        <Toast.Body>
          <div
            className={`cht-msg${socketUser}`}
            style={{ maxHeight: "500px", overflow: "auto" }}
          >
            {chatRoom[1].map((msg, idx) => (
              <Fragment key={idx}>
                {msg.client && (
                  <p
                    key={idx}
                    className="bg-primary p-3 ms-4 text-light rounded-pill"
                  >
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
          <Form.Group controlId={`adminChatMsg${roomIndex}`}>
            <Form.Label>Write A Message</Form.Label>
            <Form.Control
              onKeyUp={(e) =>
                adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)
              }
              as="textarea"
              rows={2}
            ></Form.Control>
          </Form.Group>
          <Button
            onClick={(e) =>
              adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)
            }
            variant="success"
            type="submit"
          >
            Submit
          </Button>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default AdminChatRoomComponent;
