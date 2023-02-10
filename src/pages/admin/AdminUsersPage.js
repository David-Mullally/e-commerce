import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";

const AdminUsersPage = () => {

    const deleteHandler = () => {
        if(window.confirm("Are you sure?")) alert("user deleted successfully")
    }
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>User List</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-Mail</th>
              <th>Is Admin</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map(
              (item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>Cloud</td>
                    <td>Strife</td>
                    <td>cloud@strife-delivery-services.com</td>
                    <td>
                      <i className={item} />
                    </td>
                    <td>
                      <LinkContainer to="/admin/order-details">
                        <Button className="btm-sm">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </LinkContainer>
                      {" / "}
                      <LinkContainer to="/admin/order-details">
                        <Button variant="danger" className="btm-sm" onClick={deleteHandler}>
                          <i className="bi bi-x-circle"></i>
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AdminUsersPage;
