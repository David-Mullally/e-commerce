import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";

import { useState, useEffect } from "react";

const UsersPageComponent = ({ fetchUsers, deleteUser }) => {
  const [users, setUsers] = useState([0]);
  const [userDeleted, setUserDeleted] = useState(false);

  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
      const data = await deleteUser(userId);
      if (data === "user removed") {
        setUserDeleted(!userDeleted);
      }
    }
  };

  useEffect(() => {
    const abortctrl = new AbortController();
    fetchUsers(abortctrl)
      .then((res) => setUsers(res))
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );
    return () => {
      abortctrl.abort();
    };
  }, [userDeleted]); 

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
            {users.map((user, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <i className="bi bi-check-lg text-success"></i>
                    ) : (
                      <i className="bi bi-x-lg text-danger"></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/edit-user/${user.id}`}>
                      <Button className="btm-sm">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </LinkContainer>
                    {" / "}
                    <Button
                      variant="danger"
                      className="btm-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UsersPageComponent;
