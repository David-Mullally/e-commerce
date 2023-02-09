import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminOrdersPage = () => {
  return (
    <Row className="m-5">
      <Col md={2}>
        Admin Links
      </Col>
      <Col md={10}>
        <h1>Orders</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Payment Method</th>
              <th>Order Details</th>
            </tr>
          </thead>
                  <tbody>
                      
            {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>Mark Twain</td>
                  <td>22-01-2023</td>
                  <td>$145</td>
                  <td>
                    <i className={item} />
                  </td>
                  <td>PayPal</td>
                  <td>
                    <Link to="/admin/order-details">Go To Order</Link>
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

export default AdminOrdersPage;
