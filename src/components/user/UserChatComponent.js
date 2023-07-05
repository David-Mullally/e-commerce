import "../../chats.css";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";

const UserChatComponent = () => {
  const [socket, setSocket] = useState(false);
  const [chat, setChat] = useState([]);
  const [messageRecieved, setMessageRecieved] = useState(false);
  const [chatConnectionInfo, setChatConnectionInfo] = useState(false);
  const [reconnect, setReconnect] = useState(false);

  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      setReconnect(false);
      var audio = new Audio("/audio/chat-msg.mp3");
      const socket = socketIOClient();
      socket.on("no admin here now", (msg) => {
        setChat((chat) => {
          return [...chat, { admin: "no admin here now" }];
        });
      });
      socket.on("server sends message from admin to client", (msg) => {
        setChat((chat) => {
          return [...chat, { admin: msg }];
        });
        setMessageRecieved(true);
        audio.play();
        const chatMessages = document.querySelector(".cht-msg");
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
      setSocket(socket);
      socket.on("admin closed chat", () => {
        setChat([]);
        setChatConnectionInfo("admin closed chat. Type something and submit and reconnect");
        setReconnect(true);
      });
      return () => socket.disconnect();
    }
  }, [userInfo.isAdmin, reconnect]);

  const clientSubmitChatMsg = (e) => {
    if (e.keyCode && e.keyCode !== 13) {
      return;
    }
    setChatConnectionInfo("");
    setMessageRecieved(false);
    const msg = document.getElementById("clientChatMsg");
    let v = msg.value.trim();
    if (v === "" || v === null || v === false || !v) {
      return;
    }
    socket.emit("client sends message", v);
    setChat((chat) => {
      return [...chat, { client: v }];
    });
    msg.focus();
    setTimeout(() => {
      msg.value = "";
      const chatMessages = document.querySelector(".chat-msg");
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 200);
  };

  return !userInfo.isAdmin ? (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="bi bi-chat-dots comment"></i>
        {messageRecieved && (
          <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border- border-light rounded-circle"></span>
        )}

        <i className="bi bi-x-circle close"></i>
      </label>
      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Let's Chat -Online</h6>
        </div>
        <div className="chat-form">
          <div className="chat-msg">
            <p>{chatConnectionInfo}</p>
            {chat.map((item, id) => {
              console.log(item);
              return (
                <div>
                  {item.client && (
                    <p key={id}>
                      <b>You:</b> {item.client}
                    </p>
                  )}
                  {item.admin && (
                    <p
                      key={id}
                      className="bg-primary p-3 ms-4 text-light rounded-pill"
                    >
                      <b>Support:</b> {item.admin}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <textarea
            onKeyUp={(e) => clientSubmitChatMsg(e)}
            id="clientChatMsg"
            className="form-control"
            placeholder="Your Text Message"
          ></textarea>
          <button
            onClick={(e) => clientSubmitChatMsg(e)}
            className="btn btn-success btn-block"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default UserChatComponent;
