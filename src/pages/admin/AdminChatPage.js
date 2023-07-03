import { Col, Row } from "react-bootstrap";
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";

import { useSelector } from "react-redux";

const AdminChatPage = () => {
    const { chatRooms } = useSelector((state) => state.adminChat);
    console.log(chatRooms);
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <AdminChatRoomComponent />
      </Col>
    </Row>
  );
};

export default AdminChatPage;
